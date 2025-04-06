/*let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
  if (!global.db.data.settings[conn.user.jid].restrict)
{
return m.reply('*[ ⚠️ ] 𝙴𝙻 𝙾𝚆𝙽𝙴𝚁 𝚃𝙸𝙴𝙽𝙴 𝚁𝙴𝚂𝚃𝚁𝙸𝙽𝙶𝙸𝙳𝙾 (𝚎𝚗𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝 / 𝚍𝚒𝚜𝚊𝚋𝚕𝚎 𝚛𝚎𝚜𝚝𝚛𝚒𝚌𝚝) 𝙴𝙻 𝚄𝚂𝙾 𝙳𝙴 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾*');
}

    let kickte = `*[ ℹ️ ] Menciona al usuario que deseas eliminar.*`;

    if (!m.mentionedJid[0] && !m.quoted) 
        return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte) });

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
    let groupMetadata = await conn.groupMetadata(m.chat);
    let owner = groupMetadata.owner;

    if (user === owner) {
        return m.reply(`*[ ℹ️ ] No puedes eliminar al creador del grupo.*`);
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
    m.reply(`*[ ℹ️ ] El participante fue eliminado.*`);
};

handler.help = ['Aviso *<txt>*'];
handler.tags = ['gc'];
handler.command = /^(ick|an|acar|xpulsar|ip)$/i;
handler.customPrefix = /k|K|b|B|s|S|e|E|r|R/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;*/

// ❀ Código By JTxs

import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {

if (!text) return conn.reply(m.chat, '❀ Ingresa un link de Pornhub Para Descargar Su Video 🍭', m)
try {
let api = `https://www.dark-yasiya-api.site/download/phub?url=${text}`
let res = await fetch(api);
let json = await res.json()
let resu = json.result.format[0];

let { video_title, video_uploader } = json.result
let { resolution, } = json.result.format[1]

let url = resu.download_url;

m.react('🕑');
await conn.sendMessage(m.chat, { video: { url: url }, caption: video_title }, { quoted: m });
m.react('✅');

} catch (error) {
m.reply(`Error: ${error.message}`);
console.error(error)
}}

handler.command = ['pornhubdl', 'phdl'];
handler.tag = ['descargas'];
handler.help = ['pornohubdl'];
//handler.estrellas = 9;

export default handler;