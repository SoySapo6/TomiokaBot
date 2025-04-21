const { exec } = require("child_process");

const comandosProhibidos = [
    "rm"
];

async function ejecutarTermux(socket, from, comando) {
    try {
        // Verificar si el comando es peligroso
        if (comandosProhibidos.some(prohibido => comando.includes(prohibido))) {
            await socket.sendMessage(from, { text: "🚫 *Comando no permitido por seguridad.*" });
            return;
        }

        exec(comando, (error, stdout, stderr) => {
            if (error) {
                socket.sendMessage(from, { text: `❌ *Error:* ${error.message}` });
                return;
            }
            if (stderr) {
                socket.sendMessage(from, { text: `⚠️ *Salida de error:* ${stderr}` });
                return;
            }
            socket.sendMessage(from, { text: `✅ *Resultado:* \n${stdout}` });
        });
    } catch (error) {
        socket.sendMessage(from, { text: "❌ Error al ejecutar el comando." });
        console.error("Error en termux.js:", error);
    }
}

module.exports = ejecutarTermux;
