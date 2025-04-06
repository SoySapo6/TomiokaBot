const path = require("path");

// Prefixo dos comandos.
exports.PREFIX = "/";

// Emoji do bot (mude se preferir).
exports.BOT_EMOJI = "🤖";

// Nome do bot (mude se preferir).
exports.BOT_NAME = "LITE BOT";

// Número do bot. Coloque o número do bot
// (apenas números, exatamente como está no WhatsApp).
exports.BOT_NUMBER = "559999999999";

// Número do dono do bot. Coloque o número do dono do bot
// (apenas números, exatamente como está no WhatsApp).
exports.OWNER_NUMBER = "559999999999";

// Diretório de arquivos de mídia.
exports.ASSETS_DIR = path.resolve(__dirname, "assets");

// Diretório de arquivos temporários.
exports.TEMP_DIR = path.resolve(__dirname, "temp");

// Diretório de credenciais do Baileys.
exports.BAILEYS_CREDS_DIR = path.resolve(__dirname, "baileys");

// Timeout em milissegundos por ação (evitar banimento do número).
exports.TIMEOUT_IN_MILLISECONDS_BY_ACTION = 700;

// Plataforma de API's
exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Obtenha seu token, criando uma conta em: https://api.spiderx.com.br.
exports.SPIDER_API_TOKEN = "seu_token_aqui";
