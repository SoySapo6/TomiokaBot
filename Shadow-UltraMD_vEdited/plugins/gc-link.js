var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
conn.reply(m.chat, '🔗\v' + link, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['gc']
handler.command = ['link','linkgroup']

handler.group = true
handler.botAdmin = true

export default handler