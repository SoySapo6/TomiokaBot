import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, text, isPrems}) => {

  try {

    const img = './media/menus/Menu2.jpg';

    const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);
/*
    const user = global.db.data.users[m.sender];
    const {money, joincount} = global.db.data.users[m.sender];
    const {exp, limit, level, role} = global.db.data.users[m.sender];
    const rtotalreg = Object.values(global.db.data.users).filter((user) => user.registered == true).length;
*/

const user = global.db.data.users[m.sender]; 
const { money, joincount, exp, limit, level, role } = user;
const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length;

    const more = String.fromCharCode(8206);
    const readMore = more.repeat(850);
    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];

    const str = `> 👋🏻 ¡Hola!, ${taguser}
> ${saludo}
> ${fechaHora}
*˚₊·˚₊· ͟͟͞͞➳❥ _Akane Fayrxz_*
*☆═━┈◈ ╰ 1.4.0 MD ╯ ◈┈━═☆*
*│* 
*╰ ˚₊·˚₊· ͟͟͞͞➳❥ _By Cristian_*
*⊰᯽⊱┈──╌•|* ⊱✿⊰ *|•╌──┈⊰᯽⊱*
*⎔ _Creador:_* _Cristian Escobar_
*⎔ _Número:_* _+51 927238856_
*⎔ _Uptime:_* _${uptime}_
*⎔ _Versión:_* _1.4.0_

*⎔ _Nivel:_* _${level}_
*⎔ _Experiencia:_* _${exp}_
*⎔ _Rango:_* _${role}_
*⎔ _Diamantes:_* _${limit}_
*⎔ _ShadowCoins:_* _${money}_
*⎔ _Tokens:_* _${joincount}_
*⎔ _Premium:_* ${user.premiumTime > 0 ? '✅' : (isPrems ? '✅' : '❌') || ''}
ㅤ· · ────── ·•· ────── · · 
SHADOW ULTRA BY BK-CRISS7 🥀
- Para el menú completo usa *.allmenu*
ㅤ· · ────── ·•· ────── · · 
*╭┄⊰* TEST CTMR v:
*│* დ _.menuanimes_
*│* დ _.menuaudios_
*│* დ _.menulogos_
*│* დ _.menuowner_
*│* დ _.audeffects_
*│* დ _.menurec_
*│* დ _.menu18_
*│* დ _.menuff_
*╰─────────────────┄⊰*`.trim();

    conn.sendMessage(m.chat, { image: { url: img }, caption: str, mentions: [m.sender] }, { quoted: fkontak });

await conn.sendMessage(m.chat, { react: { text: '🤍', key: m.key } });

  } catch {
    conn.reply(m.chat,'╰⊱❌⊱ *_ERROR_* ⊱❌⊱╮\n\n*_EL MENÚ ESTÁ FALLANDO INTENTE DE NUEVO MÁS TARDE_*', m);
  }
};
//handler.command = /^(menu|menú|memu|memú|help|info|comandos|2help|menu1.2|ayuda|commands|commandos|cmd)$/i;
handler.command = /^(menuaudios)$/i;
handler.fail = null;

export default handler;

function clockString(ms) {
  const h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(':');
}
