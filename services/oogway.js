// services/oogway.js
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function generarOogway(texto) {
  const textoCodificado = encodeURIComponent(texto);
  const url = `https://api.popcat.xyz/v2/oogway?text=${textoCodificado}`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const outputPath = path.join(__dirname, '../assets/images', 'oogway.png');
    fs.writeFileSync(outputPath, response.data);

    return outputPath;
  } catch (error) {
    console.error('Error generando imagen de Oogway:', error);
    throw new Error('No se pudo generar la imagen del maestro Oogway.');
  }
}

module.exports = { generarOogway };
