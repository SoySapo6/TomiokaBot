const axios = require("axios");
const fs = require("fs");
const path = require("path");

const descargarVideo = async (url) => {
    return new Promise((resolve, reject) => {
        // Verifica si la carpeta 'videos' existe, si no, la crea
        const outputDir = './videos';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Nombre del archivo de salida
        const outputPath = `${outputDir}/${Date.now()}.mp4`;

        // Hacer la solicitud a la API de Starlight
        const apiUrl = `https://apis-starlights-team.koyeb.app/starlight/youtube-mp4?url=${encodeURIComponent(url)}`;

        // Realiza la petición HTTP
        axios.get(apiUrl)
            .then((response) => {
                if (response.data && response.data.url) {
                    // Si la respuesta tiene la URL del archivo, descárgalo
                    const videoUrl = response.data.url;
                    
                    // Usamos `wget` para descargar el video
                    const downloadCommand = `wget -O "${outputPath}" "${videoUrl}"`;

                    // Ejecutamos el comando para descargar
                    require("child_process").exec(downloadCommand, (error, stdout, stderr) => {
                        if (error) {
                            reject(`Error: ${stderr}`);
                        } else {
                            resolve(outputPath);
                        }
                    });
                } else {
                    reject("No se pudo obtener el enlace del video.");
                }
            })
            .catch((error) => {
                reject(`Error al hacer la solicitud: ${error.message}`);
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
