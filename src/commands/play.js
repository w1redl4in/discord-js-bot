const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, msg, args) => {
  const string = args.join(" ");
  try {
    search(string, (err, result) => {
      if (err) {
        msg.reply(err);
      } else {
        if (result && result.videos.length > 0) {
          const song = result.videos[0];
          playSong(bot, msg, song);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

const playSong = async (bot, msg, song) => {
  if (!song) {
  }
  if (!msg.member.voice.channel) {
    return msg.reply("Você precisa estar em um canal de voz.");
  }
  let queue = bot.queues.get(msg.member.guild.id);
  if (!queue) {
    msg.reply(`Música: ${song.title}`);
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
    queue.dispatcher = bot.queues.set(msg.member.guild.id, queue);
  }
};

module.exports = {
  name: "play",
  help: "Plays a song",
  execute,
};
