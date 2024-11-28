const { cmd } = require('../command');

cmd({
    pattern: "delete",
    react: "❌",
    alias: ["del"],
    desc: "Delete a quoted message.",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, isOwner, isAdmins, reply }) => {
    try {
        // Check if the user is the owner or an admin
        if (!isOwner && !isAdmins) return reply("❌ You are not authorized to use this command.");

        // Ensure there's a quoted message to delete
        if (!quoted) return reply("❌ Please reply to the message you want to delete.");

        // Prepare the key for message deletion
        const key = {
            remoteJid: from,
            fromMe: quoted.fromMe,
            id: quoted.id,
            participant: quoted.sender,
        };

        // Delete the quoted message
        await conn.sendMessage(from, { delete: key });
        reply("✅ Message deleted successfully.");
    } catch (e) {
        console.log(e);
        reply("❌ Error deleting the message.");
    }
});
