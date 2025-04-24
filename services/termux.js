const { exec } = require("child_process");
const config = require("../config");
const comandosProhibidos = [
    "git"
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
            socket.sendMessage(from, { text: `ㅤㅤㅤㅤ💻 𝚃𝚎𝚛𝚖𝚒𝚗𝚊𝚕 💻
            ${stdout}
> Desarrollado por ${config.OWNER_NAME}` });
        });
    } catch (error) {
        socket.sendMessage(from, { text: "❌ Error al ejecutar el comando." });
        console.error("Error en termux.js:", error);
    }
}

module.exports = ejecutarTermux;
