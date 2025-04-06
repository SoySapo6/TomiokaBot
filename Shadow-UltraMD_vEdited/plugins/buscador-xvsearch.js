import fetch from 'node-fetch';
import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!db.data.chats[m.chat].nsfw && m.isGroup) {
    return m.reply('*[ ℹ️ ] El contenido `+18` está desactivado para este chat.*\n> ᥙsᥱ *enable nsfw* ⍴ᥲrᥲ ᥲᥴ𝗍і᥎ᥲrᥣ᥆.');
    }
    if (!args[0]) {
        return conn.reply(m.chat, `*[ 🔎 ] Por favor, ingrese la búsqueda que desea realizar en XVideos.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} con mi prima.`, m);
    }

    try {
        const results = await xvideosSearch(args.join(' '));
        if (results.length === 0) {
            return conn.reply(m.chat, `*[ ⚠️ ] No se encontraron resultados para:*\n${args.join(' ')}`, m);
        }

        let responseMessage = `*[ 🔎 ] Resultados de la búsqueda para:* *${args.join(' ')}*\n\n`;
        results.forEach((video, index) => {
            responseMessage += `☁️ *Título:* ${video.title}\n`;
            responseMessage += `🕒 *Duración:* ${video.duration}\n`;
            responseMessage += `🎞️ *Calidad:* ${video.quality || 'No disponible'}\n`;
            responseMessage += `🔗 *Enlace:* ${video.url}\n---------------------------------\n\n`;
        });

        conn.reply(m.chat, responseMessage, m);
    } catch (e) {
        console.error(e);
        return conn.reply(m.chat, `*[ ❌ ] Ocurrió un error al buscar videos. Por favor, intenta de nuevo más tarde.*`, m);
    }
};

handler.command = ['xvideossearch', 'xvsearch'];
handler.register = true;

export default handler;

async function xvideosSearch(query) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://www.xvideos.com/?k=${encodeURIComponent(query)}`;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            const results = [];
            $("div.mozaique > div").each((index, element) => {
                const title = $(element).find("p.title a").attr("title");
                const videoUrl = "https://www.xvideos.com" + $(element).find("p.title a").attr("href");
                const duration = $(element).find("span.duration").text().trim();
                const quality = $(element).find("span.video-hd-mark").text().trim();

                results.push({ title, url: videoUrl, duration, quality });
            });

            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
}