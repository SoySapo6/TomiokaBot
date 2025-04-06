/**
 * Script de
 * inicialização do bot.
 *
 * Este script é
 * responsável por
 * iniciar a conexão
 * com o WhatsApp.
 *
 * Não é recomendado alterar
 * este arquivo,
 * a menos que você saiba
 * o que está fazendo.
 *
 * @author Dev Gui
 */
const {
  default: makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  isJidBroadcast,
  isJidStatusBroadcast,
  proto,
  makeInMemoryStore,
  isJidNewsletter,
  delay,
} = require("baileys");
const pino = require("pino");
const { BAILEYS_CREDS_DIR } = require("./config");
const { runLite } = require("./index");
const { onlyNumbers } = require("./utils/functions");
const {
  textInput,
  infoLog,
  warningLog,
  errorLog,
  successLog,
  tutorLog,
  bannerLog,
} = require("./utils/terminal");
const { welcome } = require("./welcome");

const store = makeInMemoryStore({
  logger: pino().child({ level: "silent", stream: "store" }),
});

bannerLog();

async function startConnection() {
  const { state, saveCreds } = await useMultiFileAuthState(BAILEYS_CREDS_DIR);

  const { version } = await fetchLatestBaileysVersion();

  const socket = makeWASocket({
    version,
    browser: ["Safari", "MacOS", "15.0"],
    logger: pino({ level: "error" }),
    printQRInTerminal: false,
    defaultQueryTimeoutMs: 60 * 1000,
    auth: state,
    shouldIgnoreJid: (jid) =>
      isJidBroadcast(jid) || isJidStatusBroadcast(jid) || isJidNewsletter(jid),
    keepAliveIntervalMs: 60 * 1000,
    markOnlineOnConnect: true,
    shouldSyncHistoryMessage: () => false,
    getMessage: async (key) => {
      if (!store) {
        return proto.Message.fromObject({});
      }

      const msg = await store.loadMessage(key.remoteJid, key.id);

      return msg ? msg.message : undefined;
    },
  });

  if (!socket.authState.creds.registered) {
    warningLog("Credenciais ainda não configuradas!");

    let enableTutor = "s";

    do {
      if (!["s", "n"].includes(enableTutor)) {
        errorLog("Opção inválida! Tente novamente.");
      }

      enableTutor = await textInput(
        "Deseja ativar o tutor com explicações detalhadas para instalação no termux? (s/n): "
      );
    } while (!["s", "n"].includes(enableTutor));

    infoLog(
      'Informe o número do Bot assim como está no WhatsApp, somente números (exemplo: "5511920202020")'
    );

    const phoneNumber = await textInput("Informe o seu número de telefone: ");

    if (!phoneNumber) {
      errorLog(
        'Número de telefone inválido! Tente novamente com o comando "yarn start" ou "npm start".'
      );

      process.exit(1);
    }

    if (enableTutor === "s") {
      await delay(1000);

      tutorLog("Estamos gerando seu código... lembre-se:\n");

      await delay(5000);

      tutorLog(
        `1. Depois que colar o código no WhatsApp, aguarde 10 segundos e depois pare o bot com CTRL + C.
        
⌛ Gerando código, aguarde.. 25% concluído.\n`
      );

      await delay(10_000);

      tutorLog(
        `2. Depois de parar o bot, 
abra o MT Manager ou ZArchiver na pasta:

📁 lite-bot  
    
Abra o arquivo config.js e configure:

- Seu prefixo ( o padrão é: / )
- Número do bot
- Número do dono do bot

⌛ Gerando código, aguarde... 50% concluído.\n`,
        "cyan"
      );

      await delay(10_000);

      tutorLog(
        `3. Depois, abra o termux e digite:
      
cd /sdcard/lite-bot

⌛ Gerando código, aguarde... 75% concluído.\n`
      );

      await delay(10_000);

      tutorLog(
        `4. Por último, inicie o bot com:
  
yarn start

ou

npm start

✅ Geração concluída! Enviando código...\n`,
        "green"
      );

      await delay(5_000);
    }

    const code = await socket.requestPairingCode(onlyNumbers(phoneNumber));

    infoLog(`Código de pareamento: ${code}`);
  }

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const statusCode =
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (statusCode === DisconnectReason.loggedOut) {
        errorLog("Bot desconectado!");
      } else {
        switch (statusCode) {
          case DisconnectReason.badSession:
            warningLog("Sessão inválida!");
            break;
          case DisconnectReason.connectionClosed:
            warningLog("Conexão fechada!");
            break;
          case DisconnectReason.connectionLost:
            warningLog("Conexão perdida!");
            break;
          case DisconnectReason.connectionReplaced:
            warningLog("Conexão substituída!");
            break;
          case DisconnectReason.multideviceMismatch:
            warningLog("Dispositivo incompatível!");
            break;
          case DisconnectReason.forbidden:
            warningLog("Conexão proibida!");
            break;
          case DisconnectReason.restartRequired:
            infoLog('Me reinicie por favor! Digite "yarn start".');
            break;
          case DisconnectReason.unavailableService:
            warningLog("Serviço indisponível!");
            break;
        }

        startConnection();
      }
    } else if (connection === "open") {
      successLog("Fui conectado com sucesso!");
    }
  });

  socket.ev.on("creds.update", saveCreds);
  socket.ev.on("messages.upsert", (data) => {
    runLite({ socket, data });
  });

  socket.ev.on("group-participants.update", (data) => {
    welcome({ socket, data });
  });

  return socket;
}

startConnection();
