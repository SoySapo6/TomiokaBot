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
  makeCacheableSignalKeyStore,
  getContentType
} = baileys;

module.exports = async (conn, from, args) => {
  try {
    const usarCode = args && ['code', 'sercode'].includes(args[0]);
    const sessionDir = path.join(__dirname, "../subbots");
    const sessionPath = path.join(sessionDir, from.split("@")[0]);

    if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });

    await conn.sendMessage(from, { react: { text: '⌛', key: { remoteJid: from } } });

    const startSubbot = async () => {
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
        browser: ['SoyMaycol', 'Chrome', '1.0']
      });

      // Respuestas automáticas
      sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const tipo = getContentType(msg.message);
        const texto = msg.message[tipo]?.text?.toLowerCase() || '';

        if (texto.includes("hola")) {
          await sock.sendMessage(msg.key.remoteJid, { text: "¡Hola!" });
        } else if (texto.includes("siu")) {
          await sock.sendMessage(msg.key.remoteJid, { text: "¡Siy!" });
        }
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
          const code = DisconnectReason[lastDisconnect?.error?.output?.statusCode] || lastDisconnect?.reason || "Desconocido";
          await conn.sendMessage(from, {
            text: `❌ *Subbot desconectado.* Motivo: ${code}.`
          });

          const reconectar = ['restartRequired', 'connectionClosed', 'timedOut', 'Desconocido'].includes(code);

          // No reconectar ni borrar sesión si estamos en modo código
          if (usarCode) return;

          if (reconectar) {
            await conn.sendMessage(from, {
              text: `🔁 *Subbot vinculado.* Reiniciando para completar la conexión...`
            });
            return startSubbot(); // reconectar
          }

          // Borrar sesión solo si no está en modo code
          if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });
        }
      });

      sock.ev.on("creds.update", saveCreds);

      if (usarCode) {
        const code = await sock.requestPairingCode(from.split("@")[0]);
        await conn.sendMessage(from, {
          text: `🔐 *Código generado:*\n\n${code}`
        });
        // No hacer nada más, esperamos que el usuario vincule
        return;
      }
    };

    await startSubbot();

  } catch (e) {
    await conn.sendMessage(from, {
      text: `❌ Error al conectar subbot: ${e.message || e}`
    });
  }
};
