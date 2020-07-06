const execute = (bot, msg, args) => {
  msg.channel.send(`
  **Meu nome original:** ${bot.user.username}
**Eu sou um bot?** ${bot.user.bot}
**Minha Hashtag:** #${bot.user.discriminator}
**Oficial?** ${bot.user.verified}
**ID:** ${bot.user.id}
  `);
};

module.exports = {
  name: "whoami",
  help: "Quem sou eu?",
  execute,
};
