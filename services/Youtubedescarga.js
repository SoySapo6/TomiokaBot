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
        const command = `yt-dlp -f best -o "${outputPath}" "ytsearch:${query}"`;

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
