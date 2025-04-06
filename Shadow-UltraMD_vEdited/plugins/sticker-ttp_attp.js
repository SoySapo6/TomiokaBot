import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`*[ ℹ️ ] Ingresa un texto para realizar tu Sticker.*`)

    let texto1 = global.packsticker
    let texto2 = global.authsticker

    let urls = {
        attp: `https://api.fgmods.xyz/api/maker/attp?text=${encodeURIComponent(text)}&apikey=elrebelde21`,
        ttp: `https://api.fgmods.xyz/api/maker/ttp?text=${encodeURIComponent(text)}&apikey=elrebelde21`
    }

    let url = urls[command]
    if (!url) return

    try {
        let stiker = await sticker(null, url, texto1, texto2)
        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    } catch (err) {
        console.error(err)
        m.reply('*[ ❌ ] Error al generar el sticker. Intenta nuevamente más tarde.*')
    }
}

handler.tags = ['sticker']
handler.help = ['ttp', 'attp']
handler.command = ['ttp', 'attp']

export default handler