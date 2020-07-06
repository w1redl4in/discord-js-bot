const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não existe nenhuma música na fila.");
  }
  queue.songs.forEach((song) => {
    msg.reply(`Nome: ${song.title}`);
  });
};

module.exports = {
  name: "songs",
  help: "Lista todas as músicas na fila",
  execute,
};
