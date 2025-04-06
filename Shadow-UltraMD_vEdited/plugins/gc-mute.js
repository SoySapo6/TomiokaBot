import fetch from 'node-fetch';

const handler = async (m, { conn, command, text, isAdmin, participants }) => {
    const userId = m.mentionedJid && m.mentionedJid[0] 
                    ? m.mentionedJid[0] 
                    : m.quoted 
                        ? m.quoted.sender 
                        : text;

    if (!isAdmin) throw '🍬 *Solo un administrador puede ejecutar este comando*';
    if (!userId) throw '🍬 *Menciona a la persona que deseas mutear o desmutear*';

    const user = global.db.data.users[userId] || {};
    user.mute = user.mute || false;

    if (command === 'mute') {
        if (user.mute) throw '🍭 *Este usuario ya ha sido muteado*';
        user.mute = true;
        await conn.reply(m.chat, '🍭 *Este usuario ha sido muteado y sus mensajes serán eliminados*', m);
    }

    if (command === 'unmute') {
        if (!user.mute) throw '🍭 *Este usuario no está muteado*';
        user.mute = false;
        await conn.reply(m.chat, '🍬 *Este usuario ha sido desmuteado*', m);
    }

    // Guardar el estado en la base de datos
    global.db.data.users[userId] = user;
};

// Escuchar y eliminar los mensajes de usuarios muteados en el mismo handler
handler.before = async (m, { conn }) => {
    const sender = m.sender;
    const isMuted = global.db.data.users[sender]?.mute;

    if (isMuted && !m.key.fromMe) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error('Error al eliminar mensaje:', e);
        }
    }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;
handler.rowner = true;

export default handler;