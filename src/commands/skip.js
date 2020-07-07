const playSong = require("./play").playSong;

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.reply("Não existe nenhuma música sendo reproduzida no momento.");
  }
  const a = queue.songs.shift();
  bot.queues.set(msg.guild.id, queue);

  console.log("item que é pra ser tocado: ", queue.songs[0]);
  console.log("item removido pelo shift", a);
  console.log("array atual", queue.songs);

  playSong(bot, msg, queue.songs[0]);
};

module.exports = {
  name: "skip",
  help: "Pula para a próxima música",
  execute,
};
