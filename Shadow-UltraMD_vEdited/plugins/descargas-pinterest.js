import axios from "axios";
import * as cheerio from "cheerio";

const pindl = {
    video: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            const mediaDataScript = $('script[data-test-id="video-snippet"]').html();
            if (!mediaDataScript) return null;

            const mediaData = JSON.parse(mediaDataScript);
            if (mediaData["@type"] === "VideoObject" && mediaData.contentUrl?.endsWith(".mp4")) {
                return {
                    type: "video",
                    name: mediaData.name || "Desconocido",
                    description: mediaData.description || "Sin descripción",
                    contentUrl: mediaData.contentUrl,
                    thumbnailUrl: mediaData.thumbnailUrl,
                    uploadDate: mediaData.uploadDate,
                    duration: mediaData.duration,
                    likeCount: mediaData.interactionStatistic?.find(
                        (stat) => stat.InteractionType["@type"] === "https://schema.org/LikeAction"
                    )?.InteractionCount || 0,
                    watchCount: mediaData.interactionStatistic?.find(
                        (stat) => stat.InteractionType["@type"] === "https://schema.org/WatchAction"
                    )?.InteractionCount || 0,
                    creator: mediaData.creator?.name || "Desconocido",
                    creatorUrl: mediaData.creator?.url || "No disponible",
                };
            }
            return null;
        } catch (error) {
            return { error: "Error al obtener el video" };
        }
    },

    image: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            // Intentar obtener la imagen desde el script de Pinterest
            let mediaDataScript = $('script[data-test-id="leaf-snippet"]').html();
            if (mediaDataScript) {
                const mediaData = JSON.parse(mediaDataScript);
                if (mediaData["@type"] === "SocialMediaPosting" && mediaData.image) {
                    return {
                        type: "image",
                        author: mediaData.author?.name || "Desconocido",
                        authorUrl: mediaData.author?.url || "No disponible",
                        headline: mediaData.headline || "Sin título",
                        image: mediaData.image,
                        datePublished: mediaData.datePublished || "Desconocida",
                    };
                }
            }

            // Si falla, intentar con las etiquetas meta
            let imageUrl = $('meta[property="og:image"]').attr("content");
            if (imageUrl) {
                return {
                    type: "image",
                    author: "Desconocido",
                    authorUrl: "No disponible",
                    headline: "Imagen obtenida de Pinterest",
                    image: imageUrl,
                    datePublished: "Desconocida",
                };
            }

            return null;
        } catch (error) {
            return { error: "Error al obtener la imagen" };
        }
    },

    gif: async (url) => {
        try {
            let { data: html } = await axios.get(url);
            let $ = cheerio.load(html);

            const mediaDataScript = $('script[data-test-id="leaf-snippet"]').html();
            if (!mediaDataScript) return null;

            const mediaData = JSON.parse(mediaDataScript);
            if (mediaData["@type"] === "SocialMediaPosting" && mediaData.image?.endsWith(".gif")) {
                return {
                    type: "gif",
                    author: mediaData.author?.name || "Desconocido",
                    authorUrl: mediaData.author?.url || "No disponible",
                    headline: mediaData.headline || "Sin título",
                    gif: mediaData.image,
                    datePublished: mediaData.datePublished || "Desconocida",
                };
            }
            return null;
        } catch (error) {
            return { error: "Error al obtener el GIF" };
        }
    },

    download: async (urlPin) => {
        let result = await pindl.video(urlPin);
        if (result) return result;

        result = await pindl.image(urlPin);
        if (result) return result;

        result = await pindl.gif(urlPin);
        return result || { error: "No se encontró ningún medio" };
    },
};

const handler = async (m, { conn, text }) => {
    if (!text) throw "❌ Ingresa una URL de Pinterest.";

    await m.react("🕓");

    try {
        const result = await pindl.download(text);
        if (result.error) throw result.error;

        let caption = "";

        if (result.type === "video") {
            caption += `📹 *Video encontrado*\n\n🎬 *Título:* ${result.name}\n🔗 *Enlace:* ${result.contentUrl}`;
            await conn.sendMessage(m.chat, { video: { url: result.contentUrl }, caption }, { quoted: m });
        } else if (result.type === "image") {
            caption += `🖼️ *Imagen encontrada*\n\n📝 *Título:* ${result.headline}\n🔗 *Enlace:* ${result.image}`;
            await conn.sendMessage(m.chat, { image: { url: result.image }, caption }, { quoted: m });
        } else if (result.type === "gif") {
            caption += `🎞️ *GIF encontrado*\n\n📝 *Título:* ${result.headline}\n🔗 *Enlace:* ${result.gif}`;
            await conn.sendMessage(m.chat, { video: { url: result.gif }, caption }, { quoted: m });
        }

        await m.react("✅");
    } catch (error) {
        await m.react("❌");
        await conn.sendMessage(m.chat, { text: `⚠️ Error: ${error}` }, { quoted: m });
    }
};

handler.help = ["pinterestdl <url>"];
handler.tags = ["descargas"];
handler.command = /^(pindl|pinterestdl)$/i;

export default handler;