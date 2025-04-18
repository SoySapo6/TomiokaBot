// services/AdReply.js
function getAdReplyScript(title, body, thumbnailUrl, mediaUrl) {
    return {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,  // Mostrar atribución del anuncio
                title: title || "SoyMaycol",  // Título del mensaje de AdReply (se puede personalizar)
                body: body || "No olvides seguirme <3",  // Cuerpo del mensaje
                thumbnailUrl: thumbnailUrl || "https://files.catbox.moe/nz83qq.png",  // Imagen (miniatura)
                mediaType: 2,  // Tipo de medio (2 para enlaces, 1 para imágenes, etc.)
                mediaUrl: mediaUrl || "https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R",  // Enlace al canal o cualquier URL
                sourceUrl: mediaUrl || "https://soymaycol.vercel.app/"  // Fuente del enlace
            }
        }
    };
}

module.exports = { getAdReplyScript };
