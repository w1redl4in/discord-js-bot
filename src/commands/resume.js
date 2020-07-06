const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não tem música pausada no momento.");
  }
  queue.connection.dispatcher.resume();
};

module.exports = {
  name: "resume",
  help: "Resume a música pausada",
  execute,
};
