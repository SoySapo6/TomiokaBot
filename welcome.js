const axios = require("axios"); const { onlyNumbers } = require("./utils/functions"); const { isActiveWelcomeGroup } = require("./database/db"); const { errorLog } = require("./utils/terminal");

async function welcome({ socket: lite, data }) { const from = data.id; const userJid = data.participants[0];

if (!isActiveWelcomeGroup(from)) return;

if (data.action === "add") { try { const numero = onlyNumbers(userJid);

// Obtener la foto real de perfil usando Baileys
  let avatarUrl;
  try {
    avatarUrl = await lite.profilePictureUrl(userJid, "image");
  } catch {
    // En caso no tenga foto, usa una genérica
    avatarUrl = "https://files.catbox.moe/xr2m6u.jpg";
  }

  // Personalizar texto del banner
  const text1 = "MaycolAI";
  const text2 = "De Parte de SoyMaycol ^^";
  const text3 = `Member ${numero}`;

  // Crear URL de Popcat con los textos personalizados
  const popcatUrl = `https://api.popcat.xyz/welcomecard?background=https://cdn.popcat.xyz/welcome-bg.png&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}&text3=${encodeURIComponent(text3)}&avatar=${encodeURIComponent(avatarUrl)}`;

  const response = await axios.get(popcatUrl, {
    responseType: "arraybuffer",
    timeout: 15000,
  });

  const buffer = Buffer.from(response.data, "binary");

  await lite.sendMessage(from, {
    image: buffer,
    caption: `┏━━━━━━━━━━━✦  
┃✧  ʜᴏʟᴀ ~ @${numero}
┃✧  ᴛᴇ ᴅᴀ ʟᴀ ʙɪᴇɴᴠᴇɴɪᴅᴀ…  
┃✧  ᴇʟ ʙᴏᴛ ᴅᴇ ʜᴀɴᴀᴋᴏ-ᴋᴜɴ  
┗━━━━━━━━━━━✦

✿ ¿𝗤𝘂𝗲́ 𝘁𝗶𝗲𝗻𝗲 𝗲𝘀𝘁𝗲 𝗕𝗼𝘁? ✿

➤ ✧ ᴛᴇᴍᴀ́ᴛɪᴄᴀ ᴅᴇ ᴀɴɪᴍᴇ 〜★  
➤ ✧ ᴄʀᴇᴀᴅᴏʀ ᴄᴏɴ ꜱᴛʏʟᴇ ✦  
➤ ✧ ᴍɪɴɪ ᴊᴜᴇɢᴏꜱ, ᴍᴀꜱᴄᴏᴛᴀꜱ, ʏ ᴍᴀ́ꜱ!

ꜱɪᴇɴᴛᴇᴛᴇ ᴄᴏ́ᴍᴏᴅ@ ʏ ᴅɪꜱꜰʀᴜᴛᴀ ~  
☁️ ᴍᴀʏᴄᴏʟᴀɪ & ʜᴀɴᴀᴋᴏ ᴛᴇ ᴄᴜɪᴅᴀɴ ☁️`, mentions: [userJid], }); } catch (error) { errorLog("Alguien se unió al grupo y no pude enviar el mensaje de bienvenida."); console.error(error.message); } } }

module.exports = { welcome };
