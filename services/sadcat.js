// services/sadcat.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function generarSadCat(texto) {
  const textoCodificado = encodeURIComponent(texto);
  const url = `https://api.popcat.xyz/sadcat?text=${textoCodificado}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const outputPath = path.join(__dirname, '../assets/images', 'sadcat.png');
    fs.writeFileSync(outputPath, response.data);

    return outputPath;
  } catch (error) {
    console.error('Error generando imagen SadCat:', error);
    throw new Error('No se pudo generar el meme del gato triste.');
  }
}

module.exports = { generarSadCat };
