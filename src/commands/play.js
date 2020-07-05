const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, msg, args) => {
  const string = args.join(" ");

  try {
    search(string, (err, res) => {
      if (err) {
        throw err;
      } else if (res && res.videos.length > 0) {
        const song = res.videos[0];
        playSong(bot, msg, song);
      } else {
        return msg.reply("Não encontrei nenhuma música");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);
  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      bot.queues.delete(msg.member.guild.id);
    }
  }

  if (!msg.member.voice.channel) {
    return msg.reply("Você precisar estar em um canal de voz!");
  }

  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
    queue.dispatcher = await queue.connection.play(
      await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
      {
        type: "opus",
      }
    );
    queue.dispatcher.on("finish", () => {
      queue.song.shift();
      playSong(bot, msg, queue.songs[0]);
    });
    bot.queues.set(msg.member.guild.id, queue);
  }
  queue.songs.push(song);
  bot.queues.set(msg.member.guild.id);
};

module.exports = {
  name: "play",
  help: `:musical_note:`,
  execute,
};
