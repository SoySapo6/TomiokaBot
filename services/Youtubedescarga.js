const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const descargarVideo = async (query) => {
    return new Promise((resolve, reject) => {
        // Verifica si la carpeta 'videos' existe, si no, la crea
        const outputDir = './videos';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputPath = `${outputDir}/${Date.now()}.mp4`;
        
        // Comando de yt-dlp con User-Agent personalizado
        const command = `yt-dlp --user-agent "User Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36" -f bestaudio+bestaudio/best -o "${outputPath}" "ytsearch:${query}"`;
        
        // Ejecuta el comando para descargar el video
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(outputPath);
            }
        });
    });
};

// Función para borrar el archivo después de un tiempo
const borrarVideo = (filePath, delay = 5000) => {
    setTimeout(() => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error al eliminar el archivo: ${err}`);
            } else {
                console.log(`Archivo eliminado: ${filePath}`);
            }
        });
    }, delay);
};

module.exports = { descargarVideo, borrarVideo };
