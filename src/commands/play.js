const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, msg, args) => {
  const string = args.join(" ");
  try {
    search(string, (err, result) => {
      if (err) {
        msg.reply(err);
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const queue = bot.queues.get(msg.guild.id);
        if (queue) {
          queue.songs.push(song);
          const lastSongAdded = queue.songs[queue.songs.length - 1];
          msg.reply(`Nova música adicionada: ${lastSongAdded.title}`);
          bot.queues.set(msg.guild.id, queue);
        } else playSong(bot, msg, song);
      } else {
        return msg.reply("Música ou Áudio não encontrado.");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);
  console.log("fila depois do skip", queue);

  if (!song && queue) {
    queue.connection.disconnect();
    return bot.queues.delete(msg.member.guild.id);
  }

  if (!msg.member.voice.channel) {
    return msg.reply("Você precisa estar em um canal de voz.");
  }

  bot.queues.set(msg.member.guild.id, queue);

  if (!queue) {
    msg.reply(`Tocando agora: ${song.title}`);
    const connection = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection,
      dispatcher: null,
      songs: [song],
    };

    queue.dispatcher = await queue.connection.play(await ytdl(song.url), {
      type: "opus",
    });

    queue.dispatcher.on("finish", () => {
      queue.songs.shift();
      bot.queues.set(msg.member.guild.id, queue);
      playSong(bot, msg, queue.songs[0]);
    });

    queue.dispatcher = bot.queues.set(msg.member.guild.id, queue);
  } else {
    bot.queues.set(msg.member.guild.id, queue);
    queue.dispatcher = await queue.connection.play(await ytdl(song.url), {
      type: "opus",
    });
  }
};

module.exports = {
  name: "play",
  help: "Plays a song",
  execute,
  playSong,
};
