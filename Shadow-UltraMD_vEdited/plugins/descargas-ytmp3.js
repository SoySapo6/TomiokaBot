import fetch from "node-fetch";
import yts from "yt-search";

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("*[ 📥 ] Ingresa el título o link de Youtube.*");
  }

  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

  let ytres = await yts(text);
  let video = ytres.videos[0];

  if (!video) {
    return m.reply("*[ ⚠️ ] Video no encontrado*");
  }

  let { title, thumbnail, timestamp, views, ago, url } = video;

  let vistas = parseInt(views).toLocaleString("es-ES") + " vistas";

  let HS = `*\`YOUTUBE - DESCARGAS\`*

ᜊ *Duración:* ${timestamp}
ᜊ *Vistas:* ${vistas}
ᜊ *Subido:* ${ago}
ᜊ *Enlace:* ${url}

> *[ ℹ️ ]* sᥱ ᥱs𝗍ᥲ ᥱᥒ᥎іᥲᥒძ᥆ sᥙ ᥲᥙძі᥆, ᥱs⍴ᥱrᥱ ᥙᥒ m᥆mᥱᥒ𝗍᥆...`;

  let thumb = (await conn.getFile(thumbnail))?.data;

  let JT = {
    contextInfo: {
      externalAdReply: {
        title: title, body: "",
        mediaType: 1, previewType: 0,
        mediaUrl: url, sourceUrl: url,
        thumbnail: thumb, renderLargerThumbnail: true,
      }
    }
  };

  await conn.reply(m.chat, HS, m, JT);

  try {
    let api = await fetch(`https://api.vreden.web.id/api/ytplaymp3?query=${url}`);
    let json = await api.json();
    let { download } = json.result;

    await conn.sendMessage(m.chat, { audio: { url: download.url }, caption: ``, mimetype: "audio/mpeg", ptt: true}, { quoted: m });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    m.reply("*[ ❌ ] Ocurrió un error al intentar obtener el audio del video.*");

    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
  }
};

handler.command = /^(ytmp)$/i;
handler.register = true

export default handler;




import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 100; 

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(
      m.chat,
      `*[ ℹ️ ] Ingresa el texto o enlace del vídeo de YouTube.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} El baño - Enrique Iglesias.`,
      m
    );
  }

  await m.react('🕓'); 

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {

      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      // Si es un texto
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '*[ ⚠️ ] Video no encontrado.*', m).then(() => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    let videoInfo = yt.video['360p']; 

    if (!videoInfo) {
      return star.reply(m.chat, '*[ ⚠️ ] No se encontró una calidad compatible para el video.*', m).then(() => m.react('✖️'));
    }

    let { fileSizeH: sizeHumanReadable, fileSize } = videoInfo;


    let sizeMB = fileSize / (1024 * 1024); 


    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(() => m.react('✖️'));
    }


    let durationInMinutes = parseFloat(timestamp.split(':')[0]) * 60 + parseFloat(timestamp.split(':')[1]);


    let txt = `*${title}*\n`;
    txt += `*⌛ Duración:* ${timestamp}\n`;
    txt += `*👀 Visitas:* ${views}\n`;
    txt += `*📆 Subido:* ${ago}\n`;
    txt += `*⚖️ Tamaño:* ${sizeHumanReadable}\n\n`;
    txt += `> ↻ El video se está enviando, aguarde un momento...*`;


    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);


    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '*[ ⚠️ ] Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    // Enviar el video según el tamaño o la duración
    if (sizeMB > limit || durationInMinutes > 30) {
      // Enviar como documento si el tamaño supera los 100 MB o si dura más de 30 minutos
      await star.sendMessage(
        m.chat,
        { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
      //await m.react('☑️');
    } else {
      // Enviar como video normal si es menor o igual al límite y dura menos de 30 minutos
      await star.sendMessage(
        m.chat,
        { video: { url: downloadUrl }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
      await m.react('✅'); // Reacción de éxito
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️'); // Error durante el proceso
    star.reply(m.chat, '*[ ❌ ] Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.*', m);
  }
};

handler.command = ['play4', 'ytmp4doc'];

export default handler;*/

import fetch from 'node-fetch';
import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

let limit = 100;

let handler = async (m, { conn: star, args, usedPrefix, command }) => {
  if (!args || !args[0]) {
    return star.reply(
      m.chat,
      `*[ ℹ️ ] Ingresa el texto o enlace del vídeo de YouTube.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} El baño - Enrique Iglesias.`,
      m
    );
  }

  await m.react('🕓');

  try {
    let query = args.join(' ');
    let isUrl = query.match(/youtu/gi);

    let video;
    if (isUrl) {
      let ytres = await yts({ videoId: query.split('v=')[1] });
      video = ytres.videos[0];
    } else {
      let ytres = await yts(query);
      video = ytres.videos[0];
      if (!video) {
        return star.reply(m.chat, '*[ ⚠️ ] Video no encontrado.*', m).then(() => m.react('✖️'));
      }
    }

    let { title, thumbnail, timestamp, views, ago, url } = video;

    let yt = await youtubedl(url).catch(async () => await youtubedlv2(url));
    
    // Solo seleccionar calidades 480p o inferiores
    let videoInfo = yt.video['480p'] || yt.video['360p'] || yt.video['240p'];

    if (!videoInfo) {
      return star.reply(m.chat, '*[ ⚠️ ] No se encontró una calidad compatible (480p o inferior) para el video.*', m).then(() => m.react('✖️'));
    }

    let { fileSizeH: sizeHumanReadable, fileSize } = videoInfo;
    let sizeMB = fileSize / (1024 * 1024);
    let durationInMinutes = parseFloat(timestamp.split(':')[0]) * 60 + parseFloat(timestamp.split(':')[1]);

    if (sizeMB >= 700) {
      return star.reply(m.chat, '✦ *El archivo es demasiado pesado (más de 700 MB). Se canceló la descarga.*', m).then(() => m.react('✖️'));
    }

    let txt = `*${title}*\n`;
    txt += `*⌛ Duración:* ${timestamp}\n`;
    txt += `*👀 Visitas:* ${views}\n`;
    txt += `*📆 Subido:* ${ago}\n`;
    txt += `*⚖️ Tamaño:* ${sizeHumanReadable}\n\n`;
    txt += `> ↻ El video se está enviando, aguarde un momento...*`;

    await star.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);

    let api = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`);
    let json = await api.json();
    let { data } = json;

    if (!data || !data.dl) {
      return star.reply(m.chat, '*[ ⚠️ ] Error al obtener el enlace de descarga desde la API.*', m).then(() => m.react('✖️'));
    }

    let { dl: downloadUrl } = data;

    if (sizeMB > limit || durationInMinutes > 30) {
      await star.sendMessage(
        m.chat,
        { document: { url: downloadUrl }, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
    } else {
      await star.sendMessage(
        m.chat,
        { video: { url: downloadUrl }, caption: `${title}`, mimetype: 'video/mp4', fileName: `${title}.mp4` },
        { quoted: m }
      );
      await m.react('✅');
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    star.reply(m.chat, '*[ ❌ ] Ocurrió un error al procesar tu solicitud. Intenta nuevamente más tarde.*', m);
  }
};

handler.command = ['play4', 'ytmp4doc'];

export default handler;