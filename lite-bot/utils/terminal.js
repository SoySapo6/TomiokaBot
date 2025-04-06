/**
 * Funções de log e interação com o terminal.
 *
 * @author Dev Gui </>
 */
const { version } = require("../package.json");
const { BOT_NAME } = require("../config");
const readline = require("node:readline");

const botName = BOT_NAME.replace(" BOT", "");

const textColor = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
};

function infoLog(message) {
  console.log(
    `\x1b[${textColor.cyan}m[🤖 ${botName}: INFO]\x1b[0m \x1b[${textColor.cyan}m${message}\x1b[0m`
  );
}

function errorLog(message) {
  console.log(
    `\x1b[${textColor.red}m[🔥 ${botName}: ERRO]\x1b[0m \x1b[${textColor.red}m${message}\x1b[0m`
  );
}

function successLog(message) {
  console.log(
    `\x1b[${textColor.green}m[🎉 ${botName}: SUCESSO]\x1b[0m \x1b[${textColor.green}m${message}\x1b[0m`
  );
}

function warningLog(message) {
  console.log(
    `\x1b[${textColor.yellow}m[☢ ${botName}: ATENÇÃO]\x1b[0m \x1b[${textColor.yellow}m${message}\x1b[0m`
  );
}

function tutorLog(message, color = "magenta") {
  const localTextColor = textColor[color];

  console.log(
    `\x1b[${localTextColor}m[🎓 ${botName}: TUTOR]\x1b[0m \x1b[${localTextColor}m${message}\x1b[0m`
  );
}

function bannerLog() {
  console.log(`\x1b[${textColor.cyan}m░█░░░▀█▀░▀█▀░█▀▀░░░█▀▄░█▀█░▀█▀\x1b[0m`);
  console.log(`░█░░░░█░░░█░░█▀▀░░░█▀▄░█░█░░█░`);
  console.log(`\x1b[${textColor.cyan}m░▀▀▀░▀▀▀░░▀░░▀▀▀░░░▀▀░░▀▀▀░░▀░\x1b[0m`);
  console.log(`\x1b[${textColor.cyan}m🤖 Versão: \x1b[0m${version}\n`);
}

async function textInput(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `\x1b[${textColor.magenta}m[🤖 ${botName}: INPUT]\x1b[0m \x1b[${textColor.magenta}m${message}\x1b[0m `,
      (answer) => {
        rl.close();
        resolve(answer);
      }
    );
  });
}

module.exports = {
  textColor,
  bannerLog,
  errorLog,
  infoLog,
  tutorLog,
  successLog,
  warningLog,
  textInput,
};
