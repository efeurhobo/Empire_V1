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
