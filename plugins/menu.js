const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "menu",
    react: "💻",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let menu = {
main: '',
download: '',
group: '',
owner: '',
convert: '',
search: ''
};

for (let i = 0; i < commands.length; i++) {
if (commands[i].pattern && !commands[i].dontAddCommandList) {
menu[commands[i].category] += `*┋* ${commands[i].pattern}\n`;
 }
}

let madeMenu = `╭────《 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝* 》────⊷
│ ╭──────✧❁✧──────◆
│ │ 🪀 ᴘʀᴇғɪx : *[${config.PREFIX}]*
│ │ 🪀 User : ${pushName}
│ │ 🪀 ʀᴀᴍ  : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│ │ 🪀 ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
│ │ 🪀 ᴠᴇʀsɪᴏɴ : *ᴠ.1.0.0*
│ │ 🪀 ᴄʀᴇᴀᴛᴏʀ* : *𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞*
│ ╰──────✧❁✧──────◆
╰══════════════════⊷
*╭───────────────❒⁠⁠⁠⁠*
*│* *ᴅᴏᴡɴʟᴏᴀᴅ ᴄᴏᴍᴍᴀɴᴅs❂*
*┕───────────────❒*
*╭──────────●●►*
${menu.download}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *ᴍᴀɪɴ ᴄᴏᴍᴍᴀɴᴅs*
*┕───────────────❒*
*╭──────────●●►*
${menu.main}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *ɢʀᴏᴜᴘ ᴄᴏᴍᴍᴀɴᴅs*
*┕───────────────❒*

*╭──────────●●►*
${menu.group}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅs*
*┕───────────────❒*

*╭──────────●●►*
${menu.owner}
*╰──────────●●►*

*╭───────────────❒⁠⁠⁠⁠*
*│* *ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅs*
*┕───────────────❒*

*╭──────────●●►*
${menu.convert}
*╰──────────●●►*

*╭─────────────────❒⁠⁠⁠⁠*
*│* *sᴇᴀʀᴄʜ ᴄᴏᴍᴍᴀɴᴅs*
*┕─────────────────❒*

*╭──────────●●►*
${menu.search}
*╰──────────●●►*

*❒⁠⁠⁠⁠▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭❒*
`

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
});
