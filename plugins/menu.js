const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({

    pattern: "menu",

    react: "⚙️",

    alias: ["panel","commands"],

    desc: "Get bot\'s command list.",

    category: "main",

    use: '.menu',

    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
let madeMenu = `┌───═[ *${config.BOT_NAME}* ]═──▸
│╭────────────···▸
┴│▸
⬡│▸ CREATOR:- 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
⬡│▸ OWNER:- ${config.OWNER_NAME}
⬡│▸ VERSION:- v1.0.0
⬡│▸ UPTIME:- ${runtime(process.uptime())}
⬡│▸ MEM:- ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
┬│▸
│╰─────────────···▸
└───────────────···▸

┌───〈 *ᴏᴡɴᴇʀ* 〉───◆
│╭─────────────···▸
┴│▸
⬡│▸  .update
⬡│▸  .ping
⬡│▸  .uptime
⬡│▸  .setpp
⬡│▸  .alive
⬡│▸  .block
⬡│▸  .clear
⬡│▸  .restart
┬│▸
│╰────────────···▸▸
└───────────────···▸
┌───〈 *ᴅᴏᴡɴʟᴏᴀᴅᴇʀ* 〉───◆
│╭─────────────···▸
┴│▸
⬡│▸  .play
⬡│▸  .video
⬡│▸  .save
⬡│▸  .quotes 
┬│▸
│╰────────────···▸▸
└───────────────···▸▸
┌───〈 *ᴀɪ* 〉───◆
│╭─────────────···▸
┴│▸
⬡│▸  .ai
┬│▸
│╰────────────···▸▸
└───────────────···▸
┌───〈 *ɢʀᴏᴜᴘ* 〉───◆
│╭─────────────···▸
┴│▸
⬡│▸  .tagall
⬡│▸  .invite
⬡│▸  .join
┬│▸
│╰────────────···▸▸
└───────────────···▸
`
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
                    
