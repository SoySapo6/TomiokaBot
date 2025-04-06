const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users;
    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else {
        await conn.reply(m.chat, `[ ℹ️ ] Etiqueta o responde al mensaje del usuario que quieras desbanear`, m);
        return;
    }
    if (db[user]) {
        db[user].banned = false;
        db[user].banRazon = '';
        const nametag = await conn.getName(user);
        const nn = conn.getName(m.sender);
        await conn.reply(m.chat, `*[ ✅️ ] El usuario \`${nametag}\` ha sido desbaneado.*`, m, { mentionedJid: [user] });
        conn.reply('51927238856@s.whatsapp.net', `*[ ℹ️ ] El usuario \`${nametag}\` ha sido desbaneado por \`${nn}\``, m, rcanal, );
    } else {
        await conn.reply(m.chat, `*[ ⚠️ ] El usuario no está registrado.*`, m);
    }
};
handler.help = ['unbanuser *<@tag>*'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.prems = true;
handler.group = true;
export default handler;