//Code mejorado por Criss Escobar 

const toM = (a) => '@' + a.split('@')[0];

function getRandomText(a, b) {
  const texts = [
    `*${toM(a)} y ${toM(b)}, deberían comenzar una aventura juntos 🌟*`,
    `*${toM(a)}, tu destino podría estar con ${toM(b)} 💫*`,
    `*${toM(a)} y ${toM(b)} son la pareja perfecta, ¡vivan los novios! 💍*`,
    `*¿Y si ${toM(a)} y ${toM(b)} se dan una oportunidad? 🌹*`,
    `*¡Alerta de química! ${toM(a)} y ${toM(b)} hacen una bonita pareja 💓*`,
    `*${toM(a)}, parece que tu media naranja es ${toM(b)} 🍊*`,
    `*Dicen que las estrellas se alinean cuando ${toM(a)} y ${toM(b)} están cerca ✨*`,
    `*${toM(a)} y ${toM(b)}... el amor está en el aire 💕*`,
    `*¿Qué opinan del dúo dinámico? ${toM(a)} y ${toM(b)} 🔥*`,
    `*${toM(a)}, ¿te animas a invitar a ${toM(b)} a una cita? ☕*`,
    `*Se dice por ahí que ${toM(a)} y ${toM(b)} son almas gemelas 🔮*`,
    `*${toM(a)} y ${toM(b)}, el universo los quiere ver juntos 🌌*`,
    `*¿Será este el inicio de una gran historia de amor entre ${toM(a)} y ${toM(b)}? 📖*`,
    `*Cupido ha lanzado su flecha entre ${toM(a)} y ${toM(b)} 🏹*`,
    `*${toM(a)}, ¿aceptarías un baile con ${toM(b)} bajo la luna? 🌙*`,
    `*Una cita entre ${toM(a)} y ${toM(b)} sería legendaria 😍*`,
    `*Que se preparen los corazones, porque ${toM(a)} y ${toM(b)} están destinados 💘*`,
    `*¿Y si hoy ${toM(a)} le confiesa sus sentimientos a ${toM(b)}? 😳*`,
    `*El amor está tocando la puerta de ${toM(a)} y ${toM(b)} 🚪❤️*`,
    `*Parece que ${toM(a)} y ${toM(b)} están hechos el uno para el otro 💏*`
  ];
  return texts[Math.floor(Math.random() * texts.length)];
}

async function handler(m, { groupMetadata }) {
  const ps = groupMetadata.participants.map(v => v.id);
  const a = ps[Math.floor(Math.random() * ps.length)];
  let b;
  do b = ps[Math.floor(Math.random() * ps.length)];
  while (b === a);

  const text = getRandomText(a, b);

  await m.react('💘');

  await m.reply(text, null, {
    mentions: [a, b],
  });
}

handler.help = ['formarpareja'];
handler.tags = ['fun'];
handler.command = ['formarpareja', 'pareja'];
handler.group = true;

export default handler;