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
      const numero = onlyNumbers(userJid);
      const waUrl = `https://wa.me/${numero}`;

      // Llamada a microlink para obtener la imagen de perfil
      const microlinkRes = await axios.get(`https://api.microlink.io/?url=${waUrl}`);
      const avatarUrl = microlinkRes.data?.data?.image?.url;

      if (!avatarUrl) {
        throw new Error("No se pudo obtener la imagen del perfil de WhatsApp.");
      }

      // Crear el link personalizado para Popcat con imagen directa
      const popcatUrl = `https://api.popcat.xyz/welcomecard?background=https://cdn.popcat.xyz/welcome-bg.png&text1=MaycolAI&text2=De+Parte+de+SoyMaycol+^^&text3=Member+${numero}&avatar=${encodeURIComponent(avatarUrl)}`;

      // Descargar la imagen generada
      const response = await axios.get(popcatUrl, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "binary");

      // Enviar al grupo
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
