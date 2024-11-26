const { cmd, commands } = require('../command');
const { readEnv } = require('../lib/database');

cmd({
    pattern: "tagall",
    desc: "Tags every person in the group.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber, pushname, groupMetadata, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isGroup) return reply("This command can only be used in a group.");
        
        // Fetch group metadata to get participants
        groupMetadata = await conn.groupMetadata(from);
        participants = groupMetadata.participants;

        let textt = `
◐╤╤✪〘 *Tag All* 〙✪╤╤◑

➲ *Message:* ${args.join(' ') || "blank"}\n\n
➲ *Author:* ${pushname} 💀
        `;
        
        // Loop through participants and tag each member
        for (let mem of participants) {
            textt += `👤 @${mem.id.split('@')[0]}\n`;
        }

        // Send the tagged message
        await conn.sendMessage(from, {
            text: textt,
            mentions: participants.map(a => a.id),
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred while trying to tag all members.");
    }
});

//join command
cmd({
    pattern: "join",
    desc: "joins group by link",
    category: "owner",
    use: '<group link>',
}, async (conn, mek, m, { from, text, isCreator, reply }) => {
    try {
        if (!isCreator) return reply(tlang().owner);
        if (!text) return reply(`Please provide a link ${tlang().greet}`);
        
        const link = text.split(" ")[0];
        
        if (!link || !link.includes("whatsapp.com")) {
            return reply("Invalid link. Please send a valid WhatsApp group link!");
        }

        const groupCode = link.split("https://chat.whatsapp.com/")[1];
        
        if (!groupCode) {
            return reply("Invalid WhatsApp group link. Make sure it's the correct format.");
        }

        await conn.groupAcceptInvite(groupCode);
        reply("😁 Joined the group successfully.");
    } catch (err) {
        console.log(err);
        reply("Error in joining the group. Please check the link.");
    }
});
