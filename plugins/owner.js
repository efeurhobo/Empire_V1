const config = require('../config');
const { exec } = require('child_process');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ping",
    desc: "To check ping",
    category: "main",
    filename: __filename,
}, async (Void, citel) => {
    try {
        const initialTime = new Date().getTime();

        // Send the initial "pinging" message and get its key
        const sentMessage = await Void.sendMessage(citel.chat, { text: '```Pinging from server...```' });
        const { key } = sentMessage;

        // Loading bar simulation
        const loadingBarLength = 20;
        const steps = [20, 40, 60, 80, 100]; // Progress steps
        const loadingInterval = 1000; // Uniform time between steps

        for (let i = 0; i < steps.length; i++) {
            const loadedBlocks = Math.floor((steps[i] / 100) * loadingBarLength);
            const loadingBar = '█'.repeat(loadedBlocks) + '░'.repeat(loadingBarLength - loadedBlocks);

            // Update the message with the current progress
            await Void.editMessage(citel.chat, key, {
                text: `*Pong*\nLoading: [${loadingBar}] ${steps[i]}%`
            });

            await new Promise(resolve => setTimeout(resolve, loadingInterval));
        }

        // Calculate the round-trip time after loading simulation
        const finalTime = new Date().getTime();
        const pingValue = finalTime - initialTime;

        // Final 100% completion message
        const finalLoadingBar = '█'.repeat(loadingBarLength);
        await Void.editMessage(citel.chat, key, {
            text: `*Pong*\nLoading: [${finalLoadingBar}] 100%`
        });

        // Wait a moment before deleting
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Delete the loading message and send the final ping result
        await Void.deleteMessage(citel.chat, key);
        await Void.sendMessage(citel.chat, {
            text: `*Ping: ${pingValue} ms*`
        });
    } catch (error) {
        console.error("Error in ping command:", error);
        await Void.sendMessage(citel.chat, { text: "An error occurred while checking the ping." });
    }
});

//get bot uptime
cmd({
    pattern: "system",
    alias: ["status", "uptime"],
    desc: "Check up time, RAM usage, and more",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let status = `*╭──────────●●►*
*Empire_V1 UPTIME↷*

*_UPTIME:➠_*  ${runtime(process.uptime())}

*_RAM USAGE:➠_* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB

*_HOSTNAME:➠_* ${os.hostname()}

*_OWNER:➠_* *${config.OWNER_MAME}*
*╰──────────●●►*
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:`${status}`},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})

//set profile picture
cmd({
    pattern: "setpp",
    desc: "Set bot profile picture.",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.message.imageMessage) return reply("❌ Please reply to an image.");
    try {
        const media = await conn.downloadMediaMessage(quoted);
        await conn.updateProfilePicture(conn.user.jid, { url: media });
        reply("🖼️ Profile picture updated successfully!");
    } catch (error) {
        reply(`❌ Error updating profile picture: ${error.message}`);
    }
});

//block user
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted) return reply("❌ Please reply to the user you want to block.");
    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User ${user} blocked successfully.`);
    } catch (error) {
        reply(`❌ Error blocking user: ${error.message}`);
    }
});

//unblock user 
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

//clear chats 
cmd({
    pattern: "clear",
    desc: "Clear all chats from the bot.",
    category: "owner",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    try {
        const chats = conn.chats.all();
        for (const chat of chats) {
            await conn.modifyChat(chat.jid, 'delete');
        }
        reply("🧹 All chats cleared successfully!");
    } catch (error) {
        reply(`❌ Error clearing chats: ${error.message}`);
    }
});

//
