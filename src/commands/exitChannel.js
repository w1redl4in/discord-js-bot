const execute = (bot, msg, args) => {
  console.log(bot.channel);
};

module.exports = {
  name: "exit",
  help: "Tira o bot do canal de voz",
  execute,
};
