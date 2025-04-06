const { Hercai } = require("hercai");

async function image(prompt) {
  const herc = new Hercai();

  return await herc.drawImage({
    model: "simurg",
    prompt: `Generate a realistic image, 
without deviating from the proposed theme below (attention, it may come in Portuguese, 
translate it into English first):

${prompt}`,
    negative_prompt: "nude, explicit, adult, nsfw",
  });
}

module.exports = {
  image,
};
