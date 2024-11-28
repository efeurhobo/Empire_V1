const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({

    pattern: "menu",

    react: "⚙️",
    desc: "Get bot\'s command list.",
    category: "main",
    filename: __filename
},
    async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Initialize menu categories
        let menu = {
            main: '',
            download: '',
            group: '',
            owner: '',
            convert: '',
            search: ''
        };

let madeMenu = `
╭────《 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏* 》────⊷
│ ╭──────✧❁✧──────◆
│ │ Owner : ${pushname}
│ ╰──────✧❁✧──────◆
╰══════════════════⊷

╭────❏ *DOWNLOAD COMMANDS* ❏
${menu.download}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *MAIN COMMANDS* ❏
${menu.main}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *GROUP COMMANDS* ❏
${menu.group}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *OWNER COMMANDS* ❏
${menu.owner}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *CONVERT COMMANDS* ❏
${menu.convert}
╰━━━━━━━━━━━━━━──⊷

╭────❏ *SEARCH COMMANDS* ❏
${menu.search}
╰━━━━━━━━━━━━━━──⊷
> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
`;
    
await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
