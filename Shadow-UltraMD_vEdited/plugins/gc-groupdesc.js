const handler = async (m, { conn, args }) => {
  const text = args.join(' ').trim();

  if (!text) {
    return m.reply('*[ ℹ️ ] Debes proporcionar una nueva descripción para el grupo.*');
  }

  try {
    await conn.groupUpdateDescription(m.chat, text);
    m.reply('*[ ✅ ] La descripción del grupo se modificó correctamente.*');
  } catch (error) {
    console.error(error);
    m.reply('*[ ❌ ] Ocurrió un error al actualizar la descripción del grupo.*');
  }
};

handler.help = ['groupdesc <texto>'];
handler.tags = ['grupo'];
handler.command = ['gcdesc', 'gpdesc', 'groupdesc'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;