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

          const debeReconectar = ['restartRequired', 'connectionClosed', 'timedOut', 'Desconocido'].includes(code);  
          if (debeReconectar) {  
            await conn.sendMessage(from, {  
              text: `🔁 *Subbot vinculado.* Reiniciando para completar la conexión...`  
            });  
            return startSubbot();  
          }  

          if (fs.existsSync(sessionPath)) fs.rmSync(sessionPath, { recursive: true, force: true });  
        }  
      });  

      sock.ev.on("creds.update", saveCreds);  

      // Respuestas automáticas
      sock.ev.on('messages.upsert', async (messageUpdate) => {
        const message = messageUpdate.messages[0];
        if (message && message.key && message.key.remoteJid === from) {
          const messageText = message.message?.conversation?.toLowerCase() || '';
          
          if (messageText.includes("hola")) {
            await conn.sendMessage(from, { text: 'Hola, ¿en qué puedo ayudarte?' });
          }

          if (messageText.includes("siu")) {
            await conn.sendMessage(from, { text: 'Siy' });
          }
        }
      });

      if (usarCode) {  
        const code = await sock.requestPairingCode(from.split("@")[0]);  
        await conn.sendMessage(from, {  
          text: `🔐 *Código generado:*\n\n${code}`  
        });  
      }  
    };  

    await startSubbot();  

  } catch (e) {  
    await conn.sendMessage(from, {  
      text: `❌ Error al conectar subbot: ${e.message || e}`  
    });  
  }  
};
