const { exec } = require("child_process");

module.exports = async (socket, from) => {
    try {
        await socket.sendMessage(from, { text: "🔄 *Actualizando el bot...*" });

        exec("git pull", async (err, stdout, stderr) => {
            if (err) {
                await socket.sendMessage(from, { text: `❌ *Error: No se pudo realizar la actualización.*\n\n📌 *Razón:* ${err.message}` });
                return;
            }

            if (stderr) {
                console.warn("Advertencia durante la actualización:", stderr);
            }

            if (stdout.includes("Already up to date.")) {
                await socket.sendMessage(from, { text: "✅ *El bot ya está actualizado.*" });
            } else {
                await socket.sendMessage(from, {
                    text: `✅ *Actualización realizada con éxito.*\n\n📂 *Cambios aplicados:*\n${stdout}`
                });

                await socket.sendMessage(from, { text: "♻ *Reiniciando el bot...*" });
                exec("pm2 restart index.js || npm start");
            }
        });
    } catch (error) {
        await socket.sendMessage(from, { text: "❌ *Ocurrió un error inesperado al actualizar.*" });
    }
};
