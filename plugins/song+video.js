const {cmd , commands} = require('../command')
const fg = require('api-dylux');
const yts = require('yt-search');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

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
//save videos or image 
cmd({
    pattern: "save",
    react: "📁",
    alias: ["store"],
    desc: "Save and send back a media file (image, video, or audio).",
    category: "media",
    use: ".save <caption>",
    filename: __filename,
},
async (conn, mek, m, { quoted, q, reply }) => {
    try {
        if (!quoted) {
            return reply("❌ Reply to a media message (video, image, or audio) with the `.save` command.");
        }

        const messageType = quoted.mtype;
        let mediaType;

        // Determine the type of media
        if (/video/.test(messageType)) {
            mediaType = "video";
        } else if (/image/.test(messageType)) {
            mediaType = "image";
        } else if (/audio/.test(messageType)) {
            mediaType = "audio";
        } else {
            return reply("❌ Only video, image, or audio messages are supported.");
        }

        // Download and save the media file
        const mediaPath = await conn.downloadAndSaveMediaMessage(quoted);
        const filePath = path.resolve(mediaPath);

        // Send the saved media back
        const mediaMessage = {
            caption: q || '',
        };
        mediaMessage[mediaType] = { url: `file://${filePath}` };

        await conn.sendMessage(m.sender, mediaMessage, { quoted: mek });
        await reply("✅ Successfully saved and sent the media file.");
    } catch (error) {
        console.error(error);
        reply("❌ Failed to save and send the media. Please try again.");
    }
});

//quotes
cmd({
    pattern: "quote",
    desc: "Get a random inspiring quote.",
    category: "fun",
    react: "💬",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        const message = `
💬 "${quote.content}"
- ${quote.author}
*QUOTES BY 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞*
        `;
        return reply(message);
    } catch (e) {
        console.error("Error fetching quote:", e);
        reply("¢συℓ∂ ησт ƒєт¢н α qυσтє. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});
