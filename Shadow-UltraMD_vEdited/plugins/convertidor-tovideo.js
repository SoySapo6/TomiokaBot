import { webp2mp4 } from '../lib/webp2mp4.js';
import { ffmpeg } from '../lib/converter.js';

const handler = async (m, { conn, usedPrefix, command }) => {
  const wait = '*[ ⏳ ] Procesando...*';

  if (!m.quoted) return conn.reply(m.chat, `*[ ☕ ] Responda a un sticker en movimiento que desee convertir en video con el comando ${usedPrefix + command}*`, m);
  const mime = m.quoted.mimetype || '';
  
  if (!/webp/.test(mime)) return conn.reply(m.chat, `*[ ☕ ] Responda a un sticker en movimiento que desee convertir en video con el comando ${usedPrefix + command}*`, m);
  
  const media = await m.quoted.download();
  if (!media) return conn.reply(m.chat, '*[ ❌ ] No se pudo descargar el archivo. Intente de nuevo.*', m);
  
  let out = Buffer.alloc(0);

  conn.reply(m.chat, wait, m);

  if (/webp/.test(mime)) {
    out = await webp2mp4(media);
  } else if (/audio/.test(mime)) {
    out = await ffmpeg(media, [
      '-filter_complex', 'color',
      '-pix_fmt', 'yuv420p',
      '-crf', '51',
      '-c:a', 'copy',
      '-shortest',
    ], 'mp3', 'mp4');
  }

  await conn.sendFile(m.chat, out, 'video.mp4', '*Su Video*', m);
};

handler.help = ['tovideo'];
handler.tags = ['herramientas'];
handler.register = true;
handler.command = ['tovideo', 'tovid', 'tomp4', 'mp4', 'togif'];

export default handler;
