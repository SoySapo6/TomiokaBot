//BY CRISS
import axios from 'axios';

const query = ['rolitas', 'rolitaschidas', 'musica', 'frases', 'cumbiasperu', 'phonk', 'barcelona', 'realmadrid'];

let handler = async (m, { conn }) => {
    m.reply(wait);

    let querySelected = query[Math.floor(Math.random() * query.length)];

    tiktoks(querySelected).then(a => {
        let cap = a.title;
        conn.sendMessage(m.chat, { video: { url: a.no_watermark }, caption: cap }, { quoted: m });
    }).catch(err => {
        m.reply('Error al obtener el video.');
    });
};

handler.help = ['tiktokrandom'];
handler.tags = ['descargas'];
handler.command = ['ttrandom', 'tiktokrandom', 'ttr'];

export default handler;

async function tiktoks(querySelected) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'https://tikwm.com/api/feed/search',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'current_language=en',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
                },
                data: {
                    keywords: querySelected, // Usamos la palabra clave aleatoria
                    count: 10,
                    cursor: 0,
                    HD: 1
                }
            });

            const videos = response.data.data.videos;
            if (!videos || videos.length === 0) {
                reject('No se encontraron videos.');
            } else {
                const videorndm = videos[Math.floor(Math.random() * videos.length)];

                const result = {
                    title: videorndm.title,
                    no_watermark: videorndm.play
                };
                resolve(result);
            }
        } catch (error) {
            reject(error);
        }
    });
}