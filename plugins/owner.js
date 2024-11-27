const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

// PING COMMAND
cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "main",
    filename: __filename,
}, async (Void, citel) => {
    try {
        const initialTime = new Date().getTime();
        const sentMessage = await Void.sendMessage(citel.chat, { text: '```Pinging from server...```' });
        const { key } = sentMessage;

        const loadingSteps = [20, 40, 60, 80, 100];
        for (const step of loadingSteps) {
            const bar = '█'.repeat(step / 5) + '░'.repeat(20 - step / 5);
            await Void.editMessage(citel.chat, key, { text: `*Pong*\nLoading: [${bar}] ${step}%` });
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const pingValue = new Date().getTime() - initialTime;
        await Void.editMessage(citel.chat, key, { text: `*Pong: ${pingValue} ms*` });
    } catch (error) {
        console.error("Error in ping command:", error);
        await Void.sendMessage(citel.chat, { text: "An error occurred while checking the ping." });
    }
});

// SYSTEM STATUS COMMAND
cmd({
    pattern: "system",
    alias: ["status", "uptime"],
    desc: "Check uptime, RAM usage, and more",
    category: "main",
    filename: __filename,
}, async (conn, mek, { from, reply }) => {
    try {
        const status = `*Empire_V1 UPTIME↷*\n\n` +
                       `*_UPTIME:➠_* ${runtime(process.uptime())}\n` +
                       `*_RAM USAGE:➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ` +
                       `${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\n` +
                       `*_HOSTNAME:➠_* ${os.hostname()}\n` +
                       `*_OWNER:➠_* *${config.OWNER_NAME}*`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: status }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while fetching the system status.");
    }
});

// SET PROFILE PICTURE
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename,
}, async (conn, mek, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");

    try {
        const media = await quoted.downloadMediaMessage();
        await conn.updateProfilePicture(conn.user.id, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

// BLOCK/UNBLOCK USER
const blockUnblockCommand = (pattern, status, message) => {
    cmd({
        pattern: "block",
        desc: `${status.charAt(0).toUpperCase() + status.slice(1)} a user.`,
        category: "owner",
        react: status === 'block' ? "🚫" : "✅",
        filename: __filename,
    }, async (conn, mek, { from, isOwner, quoted, reply }) => {
        if (!isOwner) return reply("❌ You are not the owner!");
        if (!quoted) return reply(`❌ Please reply to the user you want to ${status}.`);
        const user = quoted.sender;

        try {
            await conn.updateBlockStatus(user, status);
            reply(`${message} ${user} ${status}ed successfully.`);
        } catch (error) {
            reply(`❌ Error ${status}ing user: ${error.message}`);
        }
    });
};

blockUnblockCommand("block", "block", "🚫 User");
blockUnblockCommand("unblock", "unblock", "✅ User");

// Unblock User
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to unblock.");
    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User ${user} unblocked successfully.`);
    } catch (error) {
        reply(`❌ Error unblocking user: ${error.message}`);
    }
});

// CLEAR ALL CHATS
cmd({
    pattern: "clear",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename,
}, async (conn, mek, { isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");

    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.id, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

// DELETE COMMANDS
cmd({
pattern: "delete",
react: "❌",
alias: ["del"],
desc: "delete message",
category: "owner",
use: '.del',
filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants,  isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if (!isOwner ||  !isAdmins) return;
try{
if (!m.quoted) return reply(mg.notextfordel);
const key = {
            remoteJid: m.chat,
            fromMe: false,
            id: m.quoted.id,
            participant: m.quoted.sender
        }
        await conn.sendMessage(m.chat, { delete: key })
} catch(e) {
console.log(e);
reply('successful..👨‍💻✅')
} 
});

//owner number
cmd({
    pattern: "owner",
    react: "👑", // Reaction emoji when the command is triggered
    alias: ["silent", "king"],
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        // Owner's contact info
        const ownerNumber = '+2348078582627'; // Replace this with the actual owner number
        const ownerName = '𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞'; // Replace this with the owner's name
        const organization = '𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞 Team'; // Optional: replace with the owner's organization

        // Create a vCard (contact card) for the owner
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +  // Full Name
                      `ORG:${organization};\n` +  // Organization (Optional)
                      `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\n` +  // WhatsApp ID and number
                      'END:VCARD';

        // Send the vCard first
        const sentVCard = await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send a reply message that references the vCard
        await conn.sendMessage(from, {
            text: `This is the owner's contact: ${ownerName}`,
            contextInfo: {
                mentionedJid: [ownerNumber.replace('+2348078582627') + '+2348078582627@s.whatsapp.net'], // Mention the owner
                quotedMessageId: sentVCard.key.id // Reference the vCard message
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { text: 'Sorry, there was an error fetching the owner contact.' }, { quoted: mek });
    }
});
