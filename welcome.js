const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const { onlyNumbers } = require("./utils/functions");
const { isActiveWelcomeGroup } = require("./database/db");
const { errorLog } = require("./utils/terminal");

async function welcome({ socket, data }) {
  const from = data.id;
  const userJid = data.participants[0];

  if (!isActiveWelcomeGroup(from)) return;
  if (data.action !== "add") return;

  const numero = onlyNumbers(userJid);
  let avatarUrl = "https://files.catbox.moe/xr2m6u.jpg";

  try {
    avatarUrl = await socket.profilePictureUrl(userJid, "image");
  } catch {}

  const dir = path.join(__dirname, "../stickers/");
  const outputPath = path.join(dir, "welcome.jpg");

  // Crear carpeta si no existe
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const apiUrl = `http://speedhosting.cloud:5000/api/canva/bem-vindo2?titulo=MaycolAI&avatar=${encodeURIComponent(avatarUrl)}&fundo=https://files.catbox.moe/2xuxna.png&nome=${numero}&desc=Hecho%20Por%20SoyMaycol&apikey=aa18unlhqu`;

  exec(`curl -L "${apiUrl}" --output "${outputPath}"`, async (err) => {
    if (err) {
      errorLog("Fallo al descargar imagen de bienvenida.");
      console.log(err.message);
      return;
    }

    try {
      const buffer = fs.readFileSync(outputPath);
      await socket.sendMessage(from, {
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
☁️ ᴍᴀʏᴄᴏʟᴀɪ & ʜᴀɴᴀᴋᴏ ᴛᴇ ᴄᴜɪᴅᴀɴ ☁️`,
        mentions: [userJid],
      });
      fs.unlinkSync(outputPath);
    } catch (e) {
      errorLog("Error al enviar o leer la imagen.");
      console.log(e.message);
    }
  });
}

module.exports = { welcome };
