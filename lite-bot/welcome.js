/**
 * Função de boas-vindas
 * quando alguém
 * entra no grupo
 *
 * @author Dev Gui </>
 */
const { getProfileImageData, onlyNumbers } = require("./utils/functions");
const { isActiveWelcomeGroup } = require("./database/db");
const { errorLog } = require("./utils/terminal");

async function welcome({ socket: lite, data }) {
  const from = data.id;
  const userJid = data.participants[0];

  if (!isActiveWelcomeGroup(from)) {
    return;
  }

  if (data.action === "add") {
    try {
      const { buffer } = await getProfileImageData(userJid, lite);

      await lite.sendMessage(from, {
        image: buffer,
        caption: `Seja bem vindo ao nosso grupo, @${onlyNumbers(userJid)}!`,
        mentions: [userJid],
      });
    } catch (error) {
      errorLog(
        "Alguém entrou no grupo e eu não consegui enviar a mensagem de boas-vindas!"
      );
    }
  }
}

module.exports = { welcome };
