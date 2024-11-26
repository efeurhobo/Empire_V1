const config = require('../config')
const {cmd , commands} = require('../command')
const os = require('os')

cmd({
    react: "💻",
    pattern: "menu",
    desc: "get cmd list",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
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
    menu[commands[i].category] += `${config.PREFIX}${commands[i].pattern}\n`;
     }
    }

let madeMenu = `╭─《 *𝐄𝐦𝐩𝐢𝐫𝐞_𝐕𝟏* 》───
│ OWNER : *[${config.OWNER_NAME}]*
│ UPTIME : ${runtime(process.uptime())}
│ VERSION : *v.1.0.0*
│ RAM  : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
│PREFIX : *[${config.PREFIX}]*
╰────────────────

╭──〈 *DOWNLOAD* 〉────
│ ${menu.download}
│
│
│
╰──────────────

╭──〈 *MAIN* 〉────
│ ${menu.main}
│
│
│
╰──────────────

╭──〈 *GROUP* 〉────
│ ${menu.group}
│
│
│
╰──────────────

╭──〈 *Owner* 〉────
│ ${menu.owner}
│
│
│
╰──────────────

╭──〈 *CONVERT* 〉────
│ ${menu.convert}
│
│
│
╰──────────────

╭──〈 *SEARCH* 〉────
│ ${menu.search}
│
│
╰──────────────
> 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐎𝐧𝐥𝐲_𝐨𝐧𝐞_🥇𝐞𝐦𝐩𝐢𝐫𝐞
`
await conn.sendMessage(from, {
    image: { url: config.ALIVE_IMG }, 
    caption: madeMenu
}, { quoted: mek });

} catch (e) {
console.log(e);
reply(`${e}`);
}
})
    
