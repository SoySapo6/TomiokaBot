const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { onlyNumbers } = require("./utils/functions");
const { isActiveWelcomeGroup } = require("./database/db");
const { errorLog } = require("./utils/terminal");

async function welcome({ socket: lite, data }) {
  const from = data.id;
  const userJid = data.participants[0];

  if (!isActiveWelcomeGroup(from)) return;

  if (data.action === "add") {
    try {
      const numero = onlyNumbers(userJid);

      let avatarUrl;
      try {
        avatarUrl = await lite.profilePictureUrl(userJid, "image");
      } catch {
        avatarUrl = "https://files.catbox.moe/xr2m6u.jpg";
      }

      const imagePath = path.join(__dirname, "../stickers/welcome.jpg");

      const apiURL = `http://speedhosting.cloud:5000/api/canva/bem-vindo2?titulo=MaycolAI&avatar=${encodeURIComponent(avatarUrl)}&fundo=https://files.catbox.moe/2xuxna.png&nome=${numero}&desc=Hecho%20Por%20SoyMaycol&apikey=aa18unlhqu`;

      // Ejecutar curl
      exec(`curl "${apiURL}" --output "${imagePath}"`, async (error) => {
        if (error) {
          errorLog("No se pudo generar la imagen de bienvenida con curl.");
          console.error(error);
          return;
        }

        const buffer = fs.readFileSync(imagePath);

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
☁️ ᴍᴀʏᴄᴏʟᴀɪ & ʜᴀɴᴀᴋᴏ ᴛᴇ ᴄᴜɪᴅᴀɴ ☁️`,
          mentions: [userJid],
        });

        // Eliminar imagen para ahorrar espacio
        fs.unlinkSync(imagePath);
      });

    } catch (error) {
      errorLog("Error al dar la bienvenida.");
      console.error(error.message);
    }
  }
}

module.exports = { welcome };
