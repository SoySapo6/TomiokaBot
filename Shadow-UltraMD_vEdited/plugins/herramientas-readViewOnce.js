/*let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, `*[ ℹ️ ] Responde a una imagen ViewOnce (ver solo vez)*.`, m)
if (!m?.quoted || !m?.quoted?.viewOnce) return conn.reply(m.chat, `*[ ℹ️ ] Responde a una imagen ViewOnce (ver solo una vez)*`, m)
let buffer = await m.quoted.download(false);
if (/videoMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m)
} else if (/imageMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.jpg', m.quoted?.caption || '', m)
}}
handler.help = ['read']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver'] 
handler.register = true 

export default handler*/

//Mejorado por Criss 

let { downloadContentFromMessage } = (await import('@whiskeysockets/baileys'));

let handler = async (m, { conn }) => {
if (!m.quoted) return conn.reply(m.chat, `*[ 🗣️ ] Responde a una imagen ViewOnce (ver solo vez)*.`, m)
if (!m?.quoted || !m?.quoted?.viewOnce) return conn.reply(m.chat, `*[ 🗣️ ] Responde a una imagen ViewOnce (ver solo una vez)*`, m)
let buffer = await m.quoted.download(false);
if (/videoMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m)
} else if (/imageMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'media.jpg', m.quoted?.caption || '', m)
} else if (/audioMessage/.test(m.quoted.mtype)) {
return conn.sendFile(m.chat, buffer, 'audio.mp3', '', m, { mimetype: 'audio/mp3' })
}}
handler.help = ['read']
handler.tags = ['herramientas']
handler.command = ['readviewonce', 'read', 'readvo', 'ver'] 
handler.register = true 

export default handler;