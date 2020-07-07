const Discord = require("discord.js");
require("dotenv").config();

const execute = (bot, msg, args) => {
  const whoAmI = new Discord.MessageEmbed()
    .setColor("#8746ec")
    .setTitle("Bot - Discord")
    .setAuthor(
      "Felipe Austríaco",
      "https://avatars1.githubusercontent.com/u/43390533?s=460&u=f9ad9a304ec397fe1e9f472eee589dfaad492632&v=4",
      "http://felipeaustriaco.dev"
    )
    // .setThumbnail(
    //   "https://avatars1.githubusercontent.com/u/43390533?s=460&u=f9ad9a304ec397fe1e9f472eee589dfaad492632&v=4"
    // )
    .setDescription(
      "Bot desenvolvido com o objetivo de aprendizado e entretenimento."
    )
    .addFields(
      { name: "Nome original do bot", value: "bot do lilao", inline: true },
      { name: "Help", value: ".help", inline: true },
      { name: "\u200B", value: "\u200B" },
      {
        name: "O que eu faço?",
        value: "Toco músicas e envio algumas mensagens customizadas",
        inline: true,
      },
      {
        name: "Qual ambiente estou rodando?",
        value: process.env.ENV,
        inline: true,
      },
      { name: "\u200B", value: "\u200B" }
    )
    .setFooter("Última atualização:")
    .setTimestamp();

  msg.channel.send(whoAmI);
};

module.exports = {
  name: "whoami",
  help: "Quem sou eu?",
  execute,
};
