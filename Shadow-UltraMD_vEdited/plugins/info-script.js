const handler = async (m, { conn, text, command }) => {
  try {
    // Verifica si el comando es 'script'
    if (command === 'script') {
      // Responde con el mensaje profesional y emojis
      const message = `
⚡ _*Shadow Ultra Edited*_ ⚡  
🔧 *Repositorio de la versión editada*  
🔗 *[Repositorio Edited](https://github.com/Ado926/Shadow-UltraMD_vEdited)*  

🔧 *Repositorio Original*  
🔗 *[Repositorio Original](https://github.com/CrxstianEscobar/ShadowUltra-MD)* 

🚀 \`\`\`Mejora tu experiencia con Shadow 👻\`\`\`  

💬 *Para más información, sigue el repositorio original o únete al grupo:*  
🔗 *[Grupo Oficial]* https://chat.whatsapp.com/FCS6htvAmlT7nq006lxU4I  
🔗 *[Grupo No Oficial de Wirk para Bots y Personas que les Gusta Usarlos]* https://chat.whatsapp.com/If3WAOMJqZp2WLqDp9n4Cw  
      `;
      // Envía el mensaje
      await conn.reply(m.chat, message, m);
    }
  } catch (error) {
    console.error("Error en el comando 'script':", error);
    return m.reply(`⚠️ *Hubo un error al procesar tu solicitud.*`);
  }
};

handler.command = handler.help = ['script'];
handler.tags = ['info'];

export default handler;
