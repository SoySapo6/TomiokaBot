/*import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (command === 'declaracion') {
        if (!text) return m.reply(`🌸 Ingresa el nombre de la persona a la que te le vas a declarar`);

        const imageUrl = 'https://files.catbox.moe/7pzvzf.jpg';

        const messageText = `Hola ${text} \nVengo a decirte que desde hace mucho me gustas, pero no fui capaz de demostrar amor y cariño. Te quiero pedir disculpas por mi comportamiento en dejarte hablar. \nPero con el tiempo me di cuenta que el error fue mío y quiero pedirte disculpas. \nExtraño los abrazos que nos dábamos, realmente quiero que me perdones y empezar otra vez. \n\n¿Me Perdonas?\n\n\n*Responde*: .si para aceptar y .no para rechazar`;

        await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: messageText });
    } else if (command === 'si') {
        const yesImageUrl = 'https://files.catbox.moe/sn1g4f.jpg';
        const yesMessageText = `¡Qué alegría que hayas aceptado! Me siento increíblemente feliz y emocionado por lo que está por venir. Desde que te conocí, he soñado con este momento, y ahora que es real, no puedo esperar para vivir momentos inolvidables contigo.\n\nGracias por darme esta oportunidad. 💖`;

        await conn.sendMessage(m.chat, { 
            image: { url: yesImageUrl }, 
            caption: yesMessageText
        }, { quoted: m });
    } else if (command === 'no') {
        const noImageUrl = 'https://files.catbox.moe/cqvoel.jpg';
        const noMessageText = `Entiendo y agradezco tu sinceridad. Aunque no haya sido el resultado que esperaba, valoro mucho nuestra amistad y quiero que sepas que seguiré aquí para ti. 😊`;

        await conn.sendMessage(m.chat, { 
            image: { url: noImageUrl }, 
            caption: noMessageText
        }, { quoted: m });
    }
};

handler.command = ['declaracion', 'dclarar', 'declaración', 'si', 'no', 'Si', 'No'];
handler.tags = ["fun"];
handler.help = ["declaracion"];

export default handler;*/


let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Función para enviar mensaje con imagen
    const sendImageMessage = async (imageUrl, caption) => {
        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption 
        }, { quoted: m });
    };

    if (command === 'declaracion') {
        if (!text) {
            return await conn.sendMessage(m.chat, { text: "[ 🌸 ] Ingresa el nombre de la persona a la que te le vas a declarar" }, { quoted: m });
        }

        const imageUrl = 'https://files.catbox.moe/7pzvzf.jpg';
        const messageText = `Hola ${text} \nVengo a decirte que desde hace mucho me gustas, pero no fui capaz de demostrar amor y cariño. Te quiero pedir disculpas por mi comportamiento al dejarte de hablar. \nPero con el tiempo me di cuenta de que el error fue mío y quiero pedirte disculpas. \nExtraño los abrazos que nos dábamos, realmente quiero que me perdones y empezar otra vez. \n\n¿Me perdonas?\n\n*Responde*: .si para aceptar y .no para rechazar`;

        await sendImageMessage(imageUrl, messageText);
    } 
    else if (command === 'si') {
        const yesImageUrl = 'https://files.catbox.moe/sn1g4f.jpg';
        const yesMessageText = `¡Qué alegría que hayas aceptado! Me siento increíblemente feliz y emocionado por lo que está por venir. Desde que te conocí, he soñado con este momento, y ahora que es real, no puedo esperar para vivir momentos inolvidables contigo.\n\nGracias por darme esta oportunidad. 💖`;

        await sendImageMessage(yesImageUrl, yesMessageText);
    } 
    else if (command === 'no') {
        const noImageUrl = 'https://files.catbox.moe/cqvoel.jpg';
        const noMessageText = `Entiendo y agradezco tu sinceridad. Aunque no haya sido el resultado que esperaba, valoro mucho nuestra amistad y quiero que sepas que seguiré aquí para ti. 😊`;

        await sendImageMessage(noImageUrl, noMessageText);
    }
};

handler.command = ['declaracion', 'dclarar', 'declaración', 'si', 'no'];
handler.tags = ["fun"];
handler.help = ["declaracion"];

export default handler;