// services/AdReply.js
const config = require("../config");

function getAdReplyScript(title, body, thumbnailUrl, mediaUrl) {
    return {
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: title || `${config.BOT_NAME} Made By SoyMaycol ${config.BOT_EMOJI}`,
                body: body || `${config.DESCRIPTION_SoyMaycol}`,
                thumbnailUrl: thumbnailUrl || `${config.URLIMAGE_SoyMaycol}`,
                mediaType: 2,
                mediaUrl: mediaUrl || `${config.CHANNEL_SoyMaycol}`,
                sourceUrl: mediaUrl || `${config.WEB_SoyMaycol}`
            }
        }
    };
}

module.exports = { getAdReplyScript };
