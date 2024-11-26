const { cmd, commands } = require('../command');

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
