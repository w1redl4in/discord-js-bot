const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) return msg.reply("O bot não está no canal de voz.");
  queue.connection.disconnect();
};

module.exports = {
  name: "quit",
  help: "Força o bot a sair",
  execute,
};
