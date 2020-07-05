const execute = (bot, msg, args) => {
  console.log("entrei no execute do pause");
  const queue = bot.queues.get(msg.build.id);
  console.log("existe a fila?", queue);
  if (!queue) {
    return msg.reply("Não tá tocando nenhuma música, macacao");
  }
  queue.dispatcher.pause();
};

module.exports = {
  name: "pause",
  help: "Pausa a música atual",
  execute,
};
