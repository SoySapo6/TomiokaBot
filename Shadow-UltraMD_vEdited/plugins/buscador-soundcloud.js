import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.reply(m.chat, `*[ 🔎 ] Ingresa el texto de la cancion que quieras buscar en SoundCloud*`, fkontak, m)

let result = await soundcloudSearch(text)
let title = result.name
let HS = '*[ ☕ ] Lista de canciones encontradas en SoundCloud*\n\n'
result.forEach((t, index) => { HS += `*${index + 1}* ${t.name}\n`
})
HS += `\n> rᥱs⍴᥆ᥒძᥲ ᥲ ᥱs𝗍ᥱ mᥱᥒsᥲȷᥱ ᥴ᥆ᥒ ᥱᥣ ᥒᥙ́mᥱr᥆ ძᥱ ᥣᥲ ᥴᥲᥒᥴі᥆́ᥒ 𝗊ᥙᥱ ძᥱsᥱᥲ ძᥱsᥴᥲrgᥲr.`   
let { key } = await conn.reply(m.chat, HS, m)
conn.SoundCloudSearch[m.sender] = { result, key, title }
}

handler.before = async (m, { conn }) => {
conn.SoundCloudSearch = conn.SoundCloudSearch ? conn.SoundCloudSearch : {}
if (m.isBaileys || !(m.sender in conn.SoundCloudSearch)) return

let { result, key, title } = conn.SoundCloudSearch[m.sender]
if (!m.quoted || m.quoted.id !== key.id || !m.text) return
let c = m.text.trim()
let n = Number(c)
if (n >= 1 && n <= result.length) {
let s = result[n - 1]

try {
let res = await soundcloudDL(s.link)
let thumbnail = s.imagen

let aud = { audio: { url: res.download }, mimetype: 'audio/mp4', fileName: `${res.title}.mp3`, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 2, mediaUrl: null, title: res.title, sourceUrl: null, thumbnail: await (await conn.getFile(thumbnail)).data }}}

await conn.sendMessage(m.chat, aud, { quoted: m })
conn.sendMessage(m.chat, { delete: key })
delete conn.SoundCloudSearch[m.sender]
} catch (error) {
console.error(error)
await conn.reply(m.chat, '*[ ❌ ] Error al enviar la cancion*', m)
}} else {
await conn.reply(m.chat, "*[ ℹ️ ] Responde con uno de los numeros de la cancion que quieres*", m)
}}

handler.help = ['scsearch']
handler.tags = ['buscador']
handler.command = ['scsearch', 'soundcloudsearch']

export default handler

async function soundcloudDL(url) {
try {
let ApiDL = await fetch(`https://api.siputzx.my.id/api/d/soundcloud?url=${encodeURIComponent(url)}`)
let json = await ApiDL.json() 

return { download: json.data.url, title: json.data.title, imagen: json.data.thumbnail }
} catch (error) {
console.error('Api DL error : ', error)
}}

async function soundcloudSearch(q) {
try {
let apiS = await fetch(`https://api.siputzx.my.id/api/s/soundcloud?query=${encodeURIComponent(q)}`)
let jsonS = await apiS.json()  

return jsonS.data.map(item => ({
name: item.permalink,
link: item.permalink_url,
imagen: item.artwork_url,
}))
} catch (error) {
console.error('Api Search error : ', error)
}}