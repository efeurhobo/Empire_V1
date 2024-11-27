const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');

// Song Downloader Command
cmd({
    pattern: "play",
    desc: "Download Songs",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Send me URL or title name");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🌟 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 SONG DOWNLOADER* 🌟
  
Title: ${data.title}
Description: ${data.description}
Duration: ${data.timestamp}
Uploaded: ${data.ago}
Views: ${data.views}

MADE BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download and send the audio
        await conn.sendMessage(from, {
            audio: { url: `https://ironman.koyeb.app/ironman/dl/yta?url=${url}` },
            mimetype: "audio/mpeg"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// Video Downloader Command
cmd({
    pattern: "video",
    desc: "Download Videos",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Send me URL or title name");
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `
🌟 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 VIDEO DOWNLOADER* 🌟
  
Title: ${data.title}
Description: ${data.description}
Duration: ${data.timestamp}
Uploaded: ${data.ago}
Views: ${data.views}

MADE BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
        `;
        await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        // Download and send the videos 
        await conn.sendMessage(from, {
            video: { url: `https://ironman.koyeb.app/ironman/dl/yta?url=${url}` },
            mimetype: "video/mp4",
            caption: "MADE BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞",
            fileName: `${data.title}.mp4`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

  
