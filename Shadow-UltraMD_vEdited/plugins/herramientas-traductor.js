/*const { prepareWAMessageMedia, generateWAMessageFromContent } = (await import('@whiskeysockets/baileys')).default;
// const { prepareWAMessageMedia, generateWAMessageFromContent } = await import("@whiskeysockets/baileys");
const { randomBytes } = await import("crypto");

const handler = async (m, { conn }) => {
    try {

        const { imageMessage } = await prepareWAMessageMedia({
            image: { url: "https://i.pinimg.com/736x/1c/b9/dc/1cb9dce731c1544b0bd018b02567fd1f.jpg" }
        }, { upload: conn.waUploadToServer });

        const sections = [
            {
                title: "Tags Relacionados",
                rows: [
                    {
                        title: 'Example',
                        highlight_label: "test",
                        description: "Example description",
                        id: ".play",
                    },
                ],
            },
        ];

        const messageContent = {
            interactiveMessage: {
                body: { text: '...' },
                footer: { text: '...' },
                header: {
                    title: 'Example Title',
                    subtitle: 'Example Subtitle',
                    hasMediaAttachment: true,
                    documentMessage: {
                        ...imageMessage,
                        pageCount: 1,
                        fileLength: 99999999999,
                        fileName: 'example_file',
                        jpegThumbnail: imageMessage.jpegThumbnail
                    },
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            buttonParamsJson: "{\"display_text\":\"Example Button 2\",\"id\":\"example_id_2\"}",
                            name: "quick_reply"
                        },
                        {
                            buttonParamsJson: JSON.stringify({
                                display_text: 'Example Button 3',
                                id: 'example_id_3',
                                copy_code: 'Example copy code'
                            }),
                            name: "cta_copy"
                        },
                        {
                            buttonParamsJson: "{\"display_text\":\"Example Button 4\",\"phone_number\":\"1234567890\"}",
                            name: "cta_call"
                        },
                        {
                            name: "single_select",
                            buttonParamsJson: JSON.stringify({
                                title: "Example Section",
                                sections: sections,
                            }),
                        }
                    ],
                    messageParamsJson: "{}",
                    messageVersion: 1
                }
            },
            messageContextInfo: {
                messageSecret: randomBytes(32)
            }
        };

        const message = generateWAMessageFromContent(m.chat, messageContent, { userJid: conn.user.id });
        await conn.relayMessage(m.chat, message.message, { messageId: message.key.id });

    } catch (error) {
        console.error("Error al enviar el mensaje interactivo:", error);
    }
};

handler.command = ["tes"];

export default handler;

import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingrese un texto para hablar con Llama AI.`, m)
    try {
        let api = await fetch(`https://delirius-apiofc.vercel.app/ia/llamaia?query=${text}`)
        let json = await api.json()
        let responseMessage = json.data;

        await conn.sendMessage(m.chat, {
            text: responseMessage
        }, { quoted: m });

    } catch (error) { 
        console.error(error)
    }
}

handler.command = ['llama', 'meta']

export default handler*/

import translate from '@vitalets/google-translate-api';
import fetch from 'node-fetch';

const handler = async (m, { args, usedPrefix, command }) => {
  const msg = `*[ ℹ️ ] Proporciona el idioma seguido el texto para traducirlo.*\n\n*[ 💡 ] Ejemplo:* ${usedPrefix + command} es Hello`;

  if (!args || !args[0]) return m.reply(msg);

  let lang = args[0];
  let text = args.slice(1).join(' ');
  const defaultLang = 'es';

  // Validar si el primer argumento es un código de idioma válido
  const isValidLang = /^[a-z]{2}$/.test(lang);
  if (!isValidLang) {
    lang = defaultLang;
    text = args.join(' ');
  }

  // Usar texto citado si no se proporcionó en los argumentos
  if (!text && m.quoted?.text) text = m.quoted.text;
  if (!text) return m.reply('*[ ⚠️ ] Debes proporcionar un texto para traducir.*');

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } }); // Reacción de espera

    // Intentar traducción con la API principal
    const result = await translate(text, { to: lang, autoCorrect: true });
    await m.reply(`*Traducción:*\n${result.text}`);

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  } catch (error) {
    try {
      // Intentar traducción con API secundaria si la primera falla
      const res = await fetch(`https://api.lolhuman.xyz/api/translate/auto/${lang}?apikey=${lolkeysapi}&text=${encodeURIComponent(text)}`);
      if (!res.ok) throw new Error('Error en la API secundaria');

      const json = await res.json();
      if (!json.result || !json.result.translated) throw new Error('Respuesta inválida de la API secundaria');

      await m.reply(`*Traducción:* ${json.result.translated}`);
      await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); // Reacción de éxito
    } catch (err) {
      await m.reply('*[ ❌ ] Ocurrió un error al traducir.*');
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } }); // Reacción de fallo
      console.error(err); // Para depuración
    }
  }
};

handler.help = ['traductor'];
handler.tag = ['tools'];
handler.command = /^(traductor|traducir|googletrad)$/i;

export default handler;