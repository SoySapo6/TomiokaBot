
/* Codigo hecho por @Fabri115 y mejorado por BrunoSobrino */
/*
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs'
import path from 'path'

var handler = async (m, { conn, usedPrefix }) => {

if (global.conn.user.jid !== conn.user.jid) {
return conn.reply(m.chat, '*[ ℹ️ ] Utiliza este comando directamente en el número principal del Bot*', m, rcanal, )
}

let chatId = m.isGroup ? [m.chat, m.sender] : [m.sender]
let sessionPath = './ShadowSession/'

try {

let files = await fs.readdir(sessionPath)
let filesDeleted = 0
for (let file of files) {
for (let id of chatId) {
if (file.includes(id.split('@')[0])) {
await fs.unlink(path.join(sessionPath, file))
filesDeleted++;
break
}}}

if (filesDeleted === 0) {
await conn.reply(m.chat, '*[ ℹ️ ] No se encontró ningún archivo que incluya la ID del chat*', m, rcanal, )
} else {
await conn.reply(m.chat, `*[ ℹ️ ] Se eliminaron ${filesDeleted} archivos de sesión*`, m)
conn.reply(m.chat, `*👋🏻 ¡Hola! ¿logras verme?*`, m)
}
} catch (err) {
console.error('*[ ❌ ] Error al leer la carpeta o los archivos de sesión:*', err)
await conn.reply(m.chat, '[ ℹ️ ] *Hola Soy \`ShadowBot\` Sigue el Canal*', m, rcanal)
}

}
handler.help = ['ds', 'fixmsgespera']
handler.tags = ['info']
handler.command = /^(fixmsgespera|ds)$/i
handler.estrellas = 5;
handler.register = true

export default handler*/


// Tagall Mejorado por willzek
import fetch from 'node-fetch';
import PhoneNumber from 'awesome-phonenumber';

const handler = async (m, { participants, args }) => {
  const pesan = args.join` `;
  const oi = `*» INFO :* ${pesan}`;
  let mensajes = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* 🗣️\n\n ${oi}\n\n╭  ┄ 𝅄  ۪꒰ \`⡞᪲=͟͟͞Shadow Ultra ≼᳞ׄ\` ꒱  ۟  𝅄 ┄\n`;

  for (const mem of participants) {
    let numero = PhoneNumber('+' + mem.id.replace('@s.whatsapp.net', '')).getNumber('international');
    let api = `https://delirius-apiofc.vercel.app/tools/country?text=${numero}`;
    let response = await fetch(api);
    let json = await response.json();

    let paisdata = json.result ? json.result.emoji : '🍫';
    mensajes += `${paisdata} @${mem.id.split('@')[0]}\n`;
  }

    mensajes += `╰⸼ ┄ ┄ ┄ ─  ꒰  ׅ୭ *${vs}* ୧ ׅ ꒱  ┄  ─ ┄ ⸼`;

  conn.sendMessage(m.chat, { text: mensajes, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['grupo'];
handler.command = /^(tagall2|invocar2|marcar2|todos2|invocación2)$/i;
handler.admin = true;
handler.group = true;

export default handler;