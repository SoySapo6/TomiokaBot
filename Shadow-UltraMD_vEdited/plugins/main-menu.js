import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { promises } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, command }) => {
    try {
    let { exp, diamantes, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    exp = exp || 'Desconocida';
    role = role || 'Aldeano';

        const _uptime = process.uptime() * 1000;
    const uptime = clockString(_uptime);

    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length

        await m.react('💙')
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
        let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/pk3xxk.jpg')

        const videoUrl = 'https://files.catbox.moe/ch9m5c.mp4' // URL fija del video

        let menu = `
ㅤ🍃⩁ ꯭ ͡ ᩚ꯭ ⩁ 🍃
─────── 𑁯 💎 🌟 ───────

👤 ¡Hᴏʟᴀ, ${taguser}! 
💬 ${saludo}

⏳ *Activo:* ${uptime} 
👥 *Usuarios:* ${totalreg} 
🔧 *Versión:* 3.0.0

💰 \`Gemas:\` ${diamantes} 
✨ _Exp:_ ${exp} 
🎯 *Nivel:* ${level} 
🏅 *Rango:* ${role}

${readMore}

───────
乂 ᴄᴏᴍᴀɴᴅᴏs 乂

𓂂𓏸 𓂂𓏸  𐅹੭੭   *\`mᥱᥒᥙs\`*   🌿✨  
ර ׄ 🌿˚ .menunsfw  
ර ׄ 🌿˚ .menuaudios  
ර ׄ 🌿˚ .menuff  
ර ׄ 🌿˚ .menuowner  
ර ׄ 🌿˚ .menulogos  

𓂂𓏸  𐅹੭੭   *\`іᥒ𝖿᥆\`*   🍵🍃  
ර ׄ 🍵˚ .totalf  
ර ׄ 🍵˚ .grupos  
ර ׄ 🍵˚ .sugerir  
ර ׄ 🍵˚ .report  
ර ׄ 🍵˚ .owner  
ර ׄ 🍵˚ .ping  
ර ׄ 🍵˚ .uptime  
ර ׄ 🍵˚ .horario  
ර ׄ 🍵˚ .precios  

𓂂𓏸  𐅹੭੭   *\`᥆ᥒ - ᥆𝖿𝖿\`*   🌱🌿  
ර ׄ 🌱˚ .enable *opción*  
ර ׄ 🌱˚ .disable *opción*  
ර ׄ 🌱˚ .on *opción*  
ර ׄ 🌱˚ .off *opción*  
ර ׄ 🌱˚ .manual  

𓂂𓏸  𐅹੭੭   *\`ძᥱsᥴᥲrgᥲs\`*   📤💻  
ර ׄ 📤˚ .play *texto*  
ර ׄ 📤˚ .aplay *texto*  
ර ׄ 📤˚ .aplay2 *texto*  
ර ׄ 📤˚ .splay *texto*  
ර ׄ 📤˚ .ytmp4doc *texto*  
ර ׄ 📤˚ .ytmp3doc *texto*  
ර ׄ 📤˚ .apk *texto*  
ර ׄ 📤˚ .pinterest *texto*  
ර ׄ 📤˚ .capcut *url*  
ර ׄ 📤˚ .pinvid *url*  
ර ׄ 📤˚ .ytmp4 *url*  
ර ׄ 📤˚ .ytmp3 *url*  
ර ׄ 📤˚ .tiktok *url*  
ර ׄ 📤˚ .tiktok2 *url*  
ර ׄ 📤˚ .instagram *url*  
ර ׄ 📤˚ .facebook *url*  
ර ׄ 📤˚ .mediafire *url*  
ර ׄ 📤˚ .mega *url*  
ර ׄ 📤˚ .playstore *url*  
ර ׄ 📤˚ .xnxxdl *url*  
ර ׄ 📤˚ .xvideosdl *url*  
ර ׄ 📤˚ .pornhubdl *url*  

𓂂𓏸  𐅹੭੭   *\`ᑲᥙsᥴᥲძ᥆rᥱs\`*   🧭🔍  
ර ׄ 🧭˚ .scsearch *texto*  
ර ׄ 🧭˚ .aplaysearch *texto*  
ර ׄ 🧭˚ .ttsearch *texto*  
ර ׄ 🧭˚ .ttsearch2 *texto*  
ර ׄ 🧭˚ .ytsearch *texto*  
ර ׄ 🧭˚ .hpmsearch *texto*  
ර ׄ 🧭˚ .spotifysearch *texto*  
ර ׄ 🧭˚ .githubsearch *texto*  
ර ׄ 🧭˚ .playstoresearch *texto*  
ර ׄ 🧭˚ .xnxxsearch *texto*  
ර ׄ 🧭˚ .xvsearch *texto*  
ර ׄ 🧭˚ .pornhubsearch *texto*  
ර ׄ 🧭˚ .gnula *texto*  
ර ׄ 🧭˚ .mercadolibre *texto*  
ර ׄ 🧭˚ .ffstalk *id*

𓂂𓏸  𐅹੭੭   *\`іᥒ𝗍ᥱᥣіgᥱᥒᥴіᥲs\`*   ☕ᩚ꤬ᰨᰍ
ര ׄ ☕˚ .ia *texto*
ര ׄ ☕˚ .shadow *texto*
ര ׄ ☕˚ .flux *texto*
ര ׄ ☕˚ .chatgpt *texto*
ര ׄ ☕˚ .imgg *texto*
ര ׄ ☕˚ .imgg2 *texto*
𐅹੭੭   *\`ᥣіs𝗍ᥲs\`*   📝🎴✦
ര ׄ 📝˚ .infem4 *hr + p*
ര ׄ 📝˚ .inmasc4 *hr + p*
ര ׄ 📝˚ .inmixto4 *hr + p*
ര ׄ 📝˚ .infem6 *hr + p*
ര ׄ 📝˚ .inmasc6 *hr + p*
ര ׄ 📝˚ .inmixto6 *hr + p*
ര ׄ 📝˚ .v4fem *hr + p*
ര ׄ 📝˚ .v4masc *hr + p*
ര ׄ 📝˚ .v4mixto *hr + p*
ര ׄ 📝˚ .v6fem *hr + p*
ര ׄ 📝˚ .v6masc *hr + p*
ര ׄ 📝˚ .v6mixto *hr + p*

𓂂𓏸  𐅹੭੭   *\`𝖿rᥲsᥱs\`*   🌹🎴✦
ര ׄ 🌹˚ .piropo
ര ׄ 🌹˚ .consejo
ര ׄ 🌹˚ .fraseromantica

𓂂𓏸  𐅹੭੭   *\`ᥴ᥆ᥒ᥎ᥱr𝗍іძ᥆rᥱs\`*   🪢🎴✦
ര ׄ 🪢˚ .tourl *img*
ര ׄ 🪢˚ .tourl *aud*
ര ׄ 🪢˚ .toptt *aud*
ര ׄ 🪢˚ .toptt *vid*
ര ׄ 🪢˚ .tourl *vid*
ര ׄ 🪢˚ .tomp3 *vid*
ര ׄ 🪢˚ .toimg *sticker*

𓂂𓏸  𐅹੭੭   *\`hᥱrrᥲmіᥱᥒ𝗍ᥲs\`*   🔨🎴✦
ര ׄ 🔨˚ .clima *texto*
ര ׄ 🔨˚ .readmore *texto*
ര ׄ 🔨˚ .read *texto*
ര ׄ 🔨˚ .fake *texto + user + texto*
ര ׄ 🔨˚ .traducir *idioma + texto*
ര ׄ 🔨˚ .hd *img*
ര ׄ 🔨˚ .whatmusic *aud*
ര ׄ 🔨˚ .whatmusic *vid*
ര ׄ 🔨˚ .flag *país*
ര ׄ 🔨˚ .inspect *link*
ര ׄ 🔨˚ .inspeccionar *link*
ര ׄ 🔨˚ .nuevafotochannel
ര ׄ 🔨˚ .nosilenciarcanal
ര ׄ 🔨˚ .silenciarcanal
ര ׄ 🔨˚ .seguircanal
ര ׄ 🔨˚ .avisoschannel
ര ׄ 🔨˚ .resiviravisos
ര ׄ 🔨˚ .eliminarfotochannel
ര ׄ 🔨˚ .reactioneschannel
ര ׄ 🔨˚ .reaccioneschannel
ര ׄ 🔨˚ .nuevonombrecanal
ര ׄ 🔨˚ .nuevadescchannel

𓂂𓏸  𐅹੭੭   *\`grᥙ⍴᥆s\`*   🌳🎴✦
ര ׄ 🌳˚ .add *número*
ര ׄ 🌳˚ .grupo *abrir / cerrar*
ര ׄ 🌳˚ .grouptime *tiempo*
ര ׄ 🌳˚ .notify *texto*
ര ׄ 🌳˚ Aviso *texto*
ര ׄ 🌳˚ Admins *texto*
ര ׄ 🌳˚ .todos *texto*
ര ׄ 🌳˚ .setwelcome *texto*
ര ׄ 🌳˚ .groupdesc *texto*
ര ׄ 🌳˚ .setbye *texto*
ര ׄ 🌳˚ .promote *@tag*
ര ׄ 🌳˚ .demote *@tag*
ര ׄ 🌳˚ .kick *@tag*
ര ׄ 🌳˚ .mute *@tag*
ര ׄ 🌳˚ .inactivos *opción*
ര ׄ 🌳˚ .tagnum *prefix*
ര ׄ 🌳˚ .link
ര ׄ 🌳˚ .fantasmas
ര ׄ 🌳˚ .enlinea

𓂂𓏸  𐅹੭੭   *\`ᥱ𝖿ᥱᥴ𝗍᥆s\`*   🌾🎴✦
ര ׄ 🌾˚ .bass *vid*
ര ׄ 🌾˚ .blown *vid*
ര ׄ 🌾˚ .deep *vid*
ර ׄ 🌾˚ .earrape *vid*
ര ׄ 🌾˚ .fast *vid*
ර ׄ 🌾˚ .smooth *vid*
ര ׄ 🌾˚ .tupai *vid*
ര ׄ 🌾˚ .nightcore *vid*
ര ׄ 🌾˚ .reverse *vid*
ര ׄ 🌾˚ .robot *vid*
ര ׄ 🌾˚ .slow *vid*
ര ׄ 🌾˚ .squirrel *vid*
ര ׄ 🌾˚ .chipmunk *vid*
ര ׄ 🌾˚ .reverb *vid*
ර ׄ 🌾˚ .chorus *vid*
ර ׄ 🌾˚ .flanger *vid*
ര ׄ 🌾˚ .distortion *vid*
ර ׄ 🌾˚ .pitch *vid*
ര ׄ 🌾˚ .highpass *vid*
ර ׄ 🌾˚ .lowpass *vid*
ര ׄ 🌾˚ .underwater *vid*

𓂂𓏸  𐅹੭੭   *\`serbot\`*   🌵🎴✦
ര ׄ 🪢˚ .code
ര ׄ 🪢˚ .delsesion
ര ׄ 🪢˚ .bots
ര ׄ 🪢˚ .token *(Por si perdiste tu token de reconexión)*

𓂂𓏸  𐅹੭੭   *\`ძі᥎ᥱrsі᥆ᥒ\`*   🍞🎴✦
ര ׄ 🍞˚ .gay *@tag*
ര ׄ 🍞˚ .lesbiana *@tag*
ര ׄ 🍞˚ .pajero *@tag*
ര ׄ 🍞˚ .pajera *@tag*
ര ׄ 🍞˚ .puto *@tag*
ര ׄ 🍞˚ .puta *@tag*
ര ׄ 🍞˚ .manco *@tag*
ര ׄ 🍞˚ .manca *@tag*
ര ׄ 🍞˚ .rata *@tag*
ര ׄ 🍞˚ .prostituto *@tag*
ര ׄ 🍞˚ .prostituta *@tag*
ര ׄ 🍞˚ .doxear *@tag*
ര ׄ 🍞˚ .jalamela *@tag*
ര ׄ 🍞˚ .simi *texto*
ര ׄ 🍞˚ .pregunta *texto*
ര ׄ 🍞˚ .genio *texto*
ര ׄ 🍞˚ .top
ര ׄ 🍞˚ .sorteo
ര ׄ 🍞˚ .piropo
ര ׄ 🍞˚ .chiste
ര ׄ 🍞˚ .facto
ර ׄ 🍞˚ .verdad
ර ׄ 🍞˚ .pareja
ര ׄ 🍞˚ .parejas
ര ׄ 🍞˚ .love
ര ׄ 🍞˚ .personalidad

𓂂𓏸  𐅹੭੭   *\`ȷᥙᥱg᥆s\`*   🐦🎴✦
ര ׄ 🐦˚ .pregunta *texto*
ര ׄ 🐦˚ .ttt *texto*
ര ׄ 🐦˚ .ptt *opción*
ര ׄ 🐦˚ .delttt
ര ׄ 🐦˚ .acertijo
ര ׄ 🐦˚ .trivia

𓂂𓏸  𐅹੭੭   *\`ᥲᥒіmᥱ\`*   🦊🎴✦
ര ׄ 🏕️˚ .messi

𓂂𓏸  𐅹੭੭   *\`gі𝖿s ᥒs𝖿ա\`*   🔥🎴✦
ര ׄ 🔥˚ .violar *@tag*
ര ׄ 🔥˚ .follar *@tag*
ര ׄ 🔥˚ .anal *@tag*
ര ׄ 🔥˚ .coger *@tag*
ര ׄ 🔥˚ .coger2 *@tag*
ර ׄ 🔥˚ .penetrar *@tag*
ര ׄ 🔥˚ .sexo *@tag*
ര ׄ 🔥˚ .rusa *@tag*
ര ׄ 🔥˚ .sixnine *@tag*
ര ׄ 🔥˚ .pies *@tag*
ര ׄ 🔥˚ .mamada *@tag*
ര ׄ 🔥˚ .lickpussy *@tag*
ര ׄ 🔥˚ .grabboobs *@tag*
ര ׄ 🔥˚ .suckboobs *@tag*
ര ׄ 🔥˚ .cum *@tag*
ර ׄ 🔥˚ .fap *@tag*
ര ׄ 🔥˚ .manosear *@tag*
ര ׄ 🔥˚ .lesbianas *@tag*

𓂂𓏸  𐅹੭੭   *\`s𝗍іᥴkᥱrs\`*   🍦🎴✦
ര ׄ 🍦˚ .sticker *img*
ര ׄ 🍦˚ .sticker *vid*
ര ׄ 🍦˚ .brat *texto*
ര ׄ 🍦˚ .qc *texto*
ര ׄ 🍦˚ .dado

𓂂𓏸  𐅹੭੭   *\`r⍴g\`*   💰🎴✦
ര ׄ 💰˚ .minar
ര ׄ 💰˚ .cofre
ര ׄ 💰˚ .slut
ര ׄ 💰˚ .nivel
ര ׄ 💰˚ .ruleta

𓂂𓏸  𐅹੭੭   *\`rᥱgіs𝗍r᥆\`*   🧭🎴✦
ര ׄ 🧭˚ .perfil
ര ׄ 🧭˚ .reg
ര ׄ 🧭˚ .unreg

𓂂𓏸  𐅹੭੭   *\`᥆աᥒᥱr\`*   🍃🎴✦
ര ׄ 🍃˚ .salir
ര ׄ 🍃˚ .update
ര ׄ 🍃˚ .blocklist
ര ׄ 🍃˚ .grouplist
ര ׄ 🍃˚ .restart
ര ׄ 🍃˚ .join
ര ׄ 🍃˚ .chetar
ര ׄ 🍃˚ .unbanuser
`.trim()

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, // Video fijo
            caption: menu,
            contextInfo: {
                mentionedJid: [m.sender],
                isForwarded: true,
                forwardingScore: 0,
                externalAdReply: {
                    title: '❖⊰✧  𝒮ʰᴀᵈᴏʷ ᵁˡᵗʳᴀ ᴹᴰ ⊱❖\✨Nᴜᴇᴠᴀ ᴇᴅɪᴄɪᴏɴ 𝒮ʰᴀᵈᴏʷ ✨\🚀 ᵁˡᵗʳᵃ ᴇᵛᴏˡᵘᵗᴵᴼᴺ💫',
                    thumbnailUrl: perfil,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                },
            },
            gifPlayback: true,
            gifAttribution: 0
        }, { quoted: null })
    } catch (e) {
        await m.reply(`*[ ℹ️ ] El menu cuenta actualmente con un pequeño error.*\n\n${e}`)
    }
}

handler.help = ['menuff'];
handler.tags = ['main'];
handler.customPrefix = /m|@|./i;
handler.command = ['menu', 'enu']
handler.fail = null;
export default handler;

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
