// services/pooh.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function generarPoohMeme(texto1, texto2) {
  const url = `https://api.popcat.xyz/pooh?text1=${encodeURIComponent(texto1)}&text2=${encodeURIComponent(texto2)}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const outputPath = path.join(__dirname, '../assets/images', 'pooh.png');
    fs.writeFileSync(outputPath, response.data);

    return outputPath;
  } catch (error) {
    console.error('Error generando meme Pooh:', error);
    throw new Error('No se pudo generar el meme de Pooh.');
  }
}

module.exports = { generarPoohMeme };
