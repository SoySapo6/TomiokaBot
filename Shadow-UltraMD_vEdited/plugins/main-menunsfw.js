import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {
    const img = './media/menus/Menu.jpg';
    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `👋🏻 ¡Hᴏʟᴀ! ${taguser}
Bɪᴇɴᴠᴇɴɪᴅᴏ ᴀʟ ᴍᴇɴᴜ *ɴsғᴡ* 🔞

\`\`\`${fechaHora}\`\`\`

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`* 🪱 ᦡᦡ
ര ׄ⃟🪱˚ .xnxxsearch *texto*
ര ׄ⃟🪱˚ .xvsearch *texto*
ര ׄ⃟🪱˚ .phsearch *texto*
ര ׄ⃟🪱˚ .r34 *texto*

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`* 🧋ᦡᦡ
ര ׄ⃟🧋˚ .xnxxdl *ulr*
ര ׄ⃟🧋˚ .xvdl *url*
ര ׄ⃟🧋˚ .phdl *url*

𓂂𓏸  𐅹੭੭   *\`gі𝖿s\`* 🦪 ᦡᦡ
ര ׄ⃟🦪˚ .follar *@tag*
ര ׄ⃟🦪˚ .coger *@tag*
ര ׄ⃟🦪˚ .coger2 *@tag*
ര ׄ⃟🦪˚ .penetrar *@tag*
ര ׄ⃟🦪˚ .anal *@tag*
ര ׄ⃟🦪˚ .sexo *@tag*
ര ׄ⃟🦪˚ .violar *@tag*
ര ׄ⃟🦪˚ .rusa *@tag*
ര ׄ⃟🦪˚ .sixnine *@tag*
ര ׄ⃟🦪˚ .pies *@tag*
ര ׄ⃟🦪˚ .mamada *@tag*
ര ׄ⃟🦪˚ .lickpussy *@tag*
ര ׄ⃟🦪˚ .grabboobs *@tag*
ര ׄ⃟🦪˚ .suckboobs *@tag*
ര ׄ⃟🦪˚ .cum *@tag*
ര ׄ⃟🦪˚ .fap *@tag*
ര ׄ⃟🦪˚ .manosear *@tag*
ര ׄ⃟🦪˚ .lesbianas *@tag*

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ𝗍ᥱᥒіძ᥆\`* 🍒 ᦡᦡ
ര ׄ⃟🍒˚ .pack
ര ׄ⃟🍒˚ .pack2
ര ׄ⃟🍒˚ .pack3
ര ׄ⃟🍒˚ .videoxxx
ര ׄ⃟🍒˚ .videoxxx2
ര ׄ⃟🍒˚ .randomxxx
ര ׄ⃟🍒˚ .nsfwloli
ര ׄ⃟🍒˚ .nsfwfoot
ര ׄ⃟🍒˚ .nsfwass
ര ׄ⃟🍒˚ .nsfwbdsm
ര ׄ⃟🍒˚ .nsfwcum
ര ׄ⃟🍒˚ .nsfwero
ര ׄ⃟🍒˚ .nsfwfemdom
ര ׄ⃟🍒˚ .nsfwglass
ര ׄ⃟🍒˚ .nsfworgy
ര ׄ⃟🍒˚ .yuri
ര ׄ⃟🍒˚ .yuri2
ര ׄ⃟🍒˚ .yaoi
ര ׄ⃟🍒˚ .yaoi2
ര ׄ⃟🍒˚ .panties
ര ׄ⃟🍒˚ .tetas
ര ׄ⃟🍒˚ .booty
ര ׄ⃟🍒˚ .ecchi
ര ׄ⃟🍒˚ .furro
ര ׄ⃟🍒˚ .hentai
ര ׄ⃟🍒˚ .trapito
ര ׄ⃟🍒˚ .imagenlesbians
ര ׄ⃟🍒˚ .pene
ര ׄ⃟🍒˚ .porno
ര ׄ⃟🍒˚ .pechos

> © mᥱᥒᥙ *ᥒs𝖿ᥕ* ᑲᥡ  ᥴrіss.᥎᥊`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

  } catch {
    conn.reply(m.chat,'*[ ℹ️ ] Error al enviar el menú.*\n\n> ${e}', m);
  }
};

handler.help = ['menunsfw']
handler.command = /^(menunsfw|comandosnsfw|menuhorny|hornymenu|labiblia|menu18|menu+18|menucaliente|menuporno|pornomenu|menuxxx)$/i;
handler.fail = null;

export default handler;