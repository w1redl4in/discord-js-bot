const Discord = require("discord.js");

const execute = (bot, message, args) => {
  const help = [];
  bot.commands.forEach((command) => {
    if (command.help) {
      const commands = {
        name: `${process.env.PREFIX}` + command.name,
        value: command.help,
      };
      help.push(commands);
    }
  });

  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#8746ec")
    .setTitle("Help")
    .setDescription("Lista de todos os comandos disponíveis.")
    .addFields(help)
    .setFooter("Última atualização:")
    .setThumbnail(
      "https://avatars1.githubusercontent.com/u/43390533?s=460&u=f9ad9a304ec397fe1e9f472eee589dfaad492632&v=4"
    )
    .setTimestamp();

  return message.channel.send(helpEmbed);
};

module.exports = {
  name: "help",
  execute,
};
