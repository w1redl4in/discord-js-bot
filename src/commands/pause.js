const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não tem música tocando no momento.");
  }
  queue.connection.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a música atual",
  execute,
};
