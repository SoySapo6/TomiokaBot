const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const baileys = require('baileys');
const pino = require('pino');

const {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = baileys;

module.exports = async (conn, from, args) => {
  try {
    const usarCode = args && ['code', 'sercode'].includes(args[0]);
    const sessionDir = path.join(__dirname, "../subbots");
    const sessionPath = path.join(sessionDir, from.split("@")[0]);

    if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

    await conn.sendMessage(from, { react: { text: '⌛', key: { remoteJid: from } } });

    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);
    const { version } = await fetchLatestBaileysVersion();
    const logger = pino({ level: "silent" });

    const sock = makeWASocket({
      version,
      logger,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger)
      },
      printQRInTerminal: false,
      browser: ['MayOS', 'Chrome', '1.0']
    });

    sock.ev.on("connection.update", async ({ connection, qr, lastDisconnect }) => {
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
        const statusCode = lastDisconnect?.error?.output?.statusCode;

        if (statusCode === DisconnectReason.restartRequired) {
          await conn.sendMessage(from, {
            text: `🔁 *Subbot vinculado.* Reiniciando para completar la conexión...`
          });
          return;
        }

        let reason = "Desconocido";
        const reasonName = Object.entries(DisconnectReason).find(([k, v]) => v === statusCode);
        if (reasonName) reason = reasonName[0];

        await conn.sendMessage(from, {
          text: `❌ *Subbot desconectado.* Motivo: ${reason}.`
        });

        if (fs.existsSync(sessionPath)) {
          fs.rmSync(sessionPath, { recursive: true, force: true });
        }
      }
    });

    sock.ev.on("creds.update", saveCreds);

    if (usarCode) {
      const code = await sock.requestPairingCode(from.split("@")[0]);
      await conn.sendMessage(from, {
        text: `🔐 *Código generado:*\n\n${code}`
      });
    }

  } catch (e) {
    await conn.sendMessage(from, {
      text: `❌ Error al conectar subbot: ${e.message}`
    });
  }
};
