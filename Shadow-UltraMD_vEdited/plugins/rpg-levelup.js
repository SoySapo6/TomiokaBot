import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

const MAX_LEVEL = 300;
const handler = async (m, { conn }) => {
  const name = conn.getName(m.sender);
  const usertag = '@' + m.sender.split('@s.whatsapp.net')[0];
  const user = global.db.data.users[m.sender];
  if (!canLevelUp(user.level, user.exp, global.multiplier)) {
    const { min, xp, max } = xpRange(user.level, global.multiplier);
    const message = `
*[ 🏰 ] Gremio de Aventureros*
*¡Bienvenido, ${usertag}!*

- *Nivel actual:* ${user.level}
- *Rango actual:* ${user.role}
- *Puntos de Exp:* ${user.exp - min}/${xp}

> ⍴ᥲrᥲ ᥲsᥴᥱᥒძᥱr ძᥱ ᥒі᥎ᥱᥣ ᥒᥱᥴᥱsі𝗍ᥲs ᥆ᑲ𝗍ᥱᥒᥱs \`${max - user.exp}\` ⍴ᥙᥒ𝗍᥆s ძᥱ ᥱ᥊⍴ᥱrіᥱᥒᥴіᥲ mᥲ́s. ¡sіgᥙᥱ іᥒ𝗍ᥱrᥲᥴ𝗍ᥙᥲᥒძ᥆ ᥴ᥆ᥒ ᥱᥣ ᑲ᥆𝗍!`.trim();
    return conn.sendMessage(m.chat, {text: message, mentions: [m.sender]}, {quoted: m});
  }
/*
  const before = user.level * 1;
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
*/

const before = user.level * 1;
let safetyCounter = 0;
while (canLevelUp(user.level, user.exp, global.multiplier) && safetyCounter < 100) {
  if (user.level >= MAX_LEVEL) break; // Evita que suba más allá del nivel máximo
  user.level++;
  safetyCounter++;
}
/*
while (canLevelUp(user.level, user.exp, global.multiplier) && safetyCounter < 100) {
  user.level++;
  safetyCounter++;
}*/

if (safetyCounter >= 100) console.warn("⚠️ Posible bucle infinito al subir de nivel.");

if (user.level >= MAX_LEVEL) {
  return conn.sendMessage(m.chat, {
    text: `🎖️ *¡Felicidades, ${name}!* Has alcanzado el *nivel máximo (${MAX_LEVEL})*. No puedes subir más, pero sigue interactuando para disfrutar del bot.`,
    mentions: [m.sender]
  }, { quoted: m });
}

  if (before !== user.level) {
    const levelUpMessage = `🎉 ¡Felicidades, ${name}! Has subido de nivel a ${user.level}`;
    const levelUpDetails = `*[ 🚀 ] Nuevo Nivel Alcanzado*

- *Nivel anterior:* ${before}
- *Nuevo nivel:* ${user.level}
- *Rango actual:* ${user.role}

> ᥴ᥆ᥒ𝗍іᥒᥙ́ᥲ ᥱ᥊⍴ᥣ᥆rᥲᥒძ᥆ ᥡ rᥱᥲᥣіzᥲᥒძ᥆ mіsі᥆ᥒᥱs ⍴ᥲrᥲ ᥲᥣᥴᥲᥒzᥲr ᥒᥙᥱ᥎ᥲs ᥲᥣ𝗍ᥙrᥲs ᥱᥒ ᥱᥣ grᥱmі᥆ ძᥱ ᥲ᥎ᥱᥒ𝗍ᥙrᥱr᥆s. ¡sіgᥙᥱ іᥒ𝗍ᥱrᥲᥴ𝗍ᥙᥲᥒძ᥆ ᥴ᥆ᥒ ᥱᥣ ᑲ᥆𝗍!.`.trim();
    try {
      const levelUpImage = await levelup(levelUpMessage, user.level);
      conn.sendFile(m.chat, levelUpImage, 'Menu.jpg', levelUpDetails, m);
    } catch (e) {
      conn.sendMessage(m.chat, {text: levelUpDetails, mentions: [m.sender]}, {quoted: m});
    }
  }
};
handler.help = ['levelup'];
handler.tags = ['xp'];
handler.command = ['nivel', 'lvl', 'levelup', 'level'];
handler.register = true;
export default handler;