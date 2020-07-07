const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.member.guild.id);
  console.log("pause depois do skip", queue);
  if (!queue) {
    return msg.reply("Não tem música tocando no momento.");
  }
  console.log(queue.songs);
  queue.connection.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a música atual",
  execute,
};
