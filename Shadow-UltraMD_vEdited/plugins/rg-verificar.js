import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender

    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')

    if (user.registered === true) {
        return m.reply(`*[ ℹ️ ] Ya te encuentras registrado.*\n\n*¿Quieres volver a registrarte?*\n\n*Usa este comando para eliminar tu registro*\n*\`${usedPrefix}unreg\`*`)
    }

    if (!Reg.test(text)) return m.reply(`*[ ℹ️ ] Ingresa tu nombre y edad para registrarte correctamente en mi base de datos.*\n\n*Ejemplo de uso:* \`${usedPrefix + command} Juan.25\`\n\n*Formato:*\n\`${usedPrefix + command} <nombre.edad>\` `)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('*[ ⚠️ ] El nombre no puede estar vacío.*')
    if (!age) return m.reply('*[ ⚠️ ] La edad no puede estar vacía.*')
    if (name.length >= 100) return m.reply('*[ ⚠️ ] El nombre es demasiado largo.*')

    age = parseInt(age)
    if (age > 1000) return m.reply('*❌ La edad ingresada es incorrecta.*')
    if (age < 5) return m.reply('*❌ La edad ingresada es incorrecta.*')

    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].diamantes += 15
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let sn = createHash('md5').update(m.sender).digest('hex')

    let regMessage = `*🎉 ¡Registro Completo! 🎉*\n\n`
    regMessage += `🔹 *Nombre:* ${name}\n`
    regMessage += `🔹 *Edad:* ${age} años\n\n`
    regMessage += `✨ *Recompensas:*\n`
    regMessage += `💎 *15 Diamantes*\n`
    regMessage += `💫 *245 Exp*\n`
    regMessage += `🎁 *600 Dinero*\n`
    regMessage += `🎫 *5 Tickets* \n\n`
    regMessage += `👉 *¡Ahora puedes usar todos los comandos disponibles!*\n\n`
    regMessage += `Para tu perfil personal, usa el comando *\`${usedPrefix}profile\`*\n\n`
    regMessage += `🔗 *Verifica tu registro aquí:* _Canal de Registro:_ (https://whatsapp.com/channel/0029Vb5UfTC4CrfeKSamhp1f)`

    // Notificación al canal
    const canalID = '120363402846939411@newsletter';  // ID de tu canal de WhatsApp
    let notificationMessage = `¡Nuevo registro! 🎉\n\n`
    notificationMessage += `🆔 *Usuario:* ${name}\n`
    notificationMessage += `🔹 *Edad:* ${age} años\n`
    notificationMessage += `📅 *Fecha de Registro:* ${moment().format('YYYY-MM-DD HH:mm:ss')}\n\n`
    notificationMessage += `¡Bienvenido(a) a la comunidad! 🎉`

    await conn.sendMessage(canalID, { text: notificationMessage });

    await m.react('✅')
    await conn.sendMessage(m.chat, {
        text: regMessage,
        contextInfo: {
            externalAdReply: {
                title: '¡Te has registrado exitosamente!',
                body: 'Bienvenido a la comunidad.',
                thumbnailUrl: 'https://files.catbox.moe/nwqdwh.jpg',
                sourceUrl: 'https://whatsapp.com/channel/0029Vb5UfTC4CrfeKSamhp1f',
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    })
}

handler.help = ['register']
handler.tags = ['user']
handler.command = ['reg', 'register']

export default handler;
