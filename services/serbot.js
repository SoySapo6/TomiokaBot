const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const baileys = require('baileys');
const pino = require('pino');

const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = baileys;

module.exports = async (conn, from, args) => {
  try {
    const usarCode = args && ['code', 'sercode'].includes(args[0]);
    const sessionDir = path.join(__dirname, "../subbots");
    const sessionFile = path.join(sessionDir, `${from.split("@")[0]}.json`);

    if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

    await conn.sendMessage(from, { react: { text: '⌛', key: { remoteJid: from } } });

    const { state, saveState } = useSingleFileAuthState(sessionFile);

    const sock = makeWASocket({
      logger: pino({ level: 'silent' }),
      auth: state,
      printQRInTerminal: false,
      browser: ['MayOS', 'Chrome', '1.0']
    });

    sock.ev.on("connection.update", async ({ connection, qr }) => {
      if (qr && !usarCode) {
        const qrImage = await QRCode.toBuffer(qr);
        await conn.sendMessage(from, {
          image: qrImage,
          caption: "📲 Escanea el QR desde *WhatsApp > Vincular dispositivo*"
        });
      }

      if (connection === "open") {
        await conn.sendMessage(from, {
          text: `✅ *Subbot conectado con éxito.*\n\nUsa *#menu* para ver los comandos disponibles.\n\nCanal: https://whatsapp.com/channel/0029VayXJte65yD6LQGiRB0R`
        });
      }

      if (connection === "close") {
        const code = DisconnectReason[sock?.lastDisconnect?.error?.output?.statusCode];
        await conn.sendMessage(from, {
          text: `❌ *Subbot desconectado.* Motivo: ${code || 'Desconocido'}.`
        });
        if (fs.existsSync(sessionFile)) fs.unlinkSync(sessionFile);
      }
    });

    sock.ev.on("creds.update", saveState);

    if (usarCode) {
      await conn.sendMessage(from, {
        text: `❌ Este método de conexión con código no es compatible con esta versión de Baileys.`
      });
    }

  } catch (e) {
    await conn.sendMessage(from, {
      text: `❌ Error al conectar subbot: ${e.message}`
    });
  }
};
