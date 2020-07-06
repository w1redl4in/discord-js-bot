const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não tem nenhuma música tocando no momento.");
  }
  queue.songs = [];
  bot.queues.set(msg.guild.id, queue);
  queue.connection.dispatcher.end();
};

module.exports = {
  name: "stop",
  help: "Finaliza a execução do bot",
  execute,
};
