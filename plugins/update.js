const config = require('../config');

let fs = require('fs');

const { exec } = require('child_process');

const { cmd } = require('../command');



cmd({

    pattern: "update",

    react: "🔄",

    desc: "Update folder from GitHub",

    category: "owner",

    use: '.update',

    filename: __filename

}, async (conn, mek, m, { from, reply }) => {

    try {

        const repoUrl = 'https://github.com/efeurhobo/Empire_V1.git'; 

        const targetFolder = 'plugins'; 


          // check the existence of target folder

        if (!fs.existsSync(targetFolder)) {

            fs.mkdirSync(targetFolder); 

        }



        

        const gitCommand = fs.existsSync(`${targetFolder}/.git`)

            ? `git -C ${targetFolder} pull`

            : `git clone ${repoUrl} ${targetFolder}`;



        // Implement Gate command

        await new Promise((resolve, reject) => {

            exec(gitCommand, (err, stdout, stderr) => {

                if (err) {

                    reject(`Git command failed: ${stderr}`);

                } else {

                    resolve(stdout);

                }

            });

        });



        // udate repository 

        await conn.sendMessage(from, { text: '*✅ Update completed successfully!*' }, { quoted: mek });

    } catch (error) {

        console.error(error);

        reply(`*Error during update:* ${error.message}`);

    }

});
                         
