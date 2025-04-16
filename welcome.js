const axios = require("axios");
const { onlyNumbers } = require("./utils/functions");
const { isActiveWelcomeGroup } = require("./database/db");
const { errorLog } = require("./utils/terminal");

async function welcome({ socket: lite, data }) {
  const from = data.id;
  const userJid = data.participants[0];

  if (!isActiveWelcomeGroup(from)) {
    return;
  }

  if (data.action === "add") {
    try {
      const numero = onlyNumbers(userJid); // Extraer el número del usuario
      const waUrl = `https://wa.me/${numero}`;

      // Obtener la imagen de perfil del número vía Microlink
      const microlinkResponse = await axios.get(`https://api.microlink.io/?url=${waUrl}`);
      const avatarUrl = microlinkResponse.data?.data?.image?.url;

      // Verificación por si no devuelve imagen
      if (!avatarUrl) {
        throw new Error("No se pudo obtener la imagen del perfil.");
      }

      // Crear la URL final de Popcat con la imagen obtenida
      const popcatUrl = `https://api.popcat.xyz/welcomecard?background=https://cdn.popcat.xyz/welcome-bg.png&text1=Zero%20Two&text2=Welcome+To+Pop+Cat+Community&text3=Member+${numero}&avatar=${encodeURIComponent(avatarUrl)}`;

      const response = await axios.get(popcatUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "binary");

      // Enviar la imagen de bienvenida con el mensaje personalizado
      await lite.sendMessage(from, {
        image: buffer,
        caption: `Hola @${numero} ¡Bienvenido al grupo!  
Si quieres usar el bot, utiliza .menu  
Estoy feliz de que estés aquí ^^  
😉 SoyMaycol`,
        mentions: [userJid],
      });
    } catch (error) {
      errorLog("Alguien se unió al grupo y no pude enviar el mensaje de bienvenida.");
      console.error(error);
    }
  }
}

module.exports = { welcome };
