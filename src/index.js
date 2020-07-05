const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "/commands"))
  .filter((filename) => filename.endsWith(".js"));

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`);
  bot.commands.set(command.name, command);
}

console.log(bot.commands);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
  const args = msg.content.slice(process.env.PREFIX.length).split(" ");
  const command = args.shift();
  try {
    bot.commands.get(command).execute(bot, msg, args);
  } catch (error) {
    return msg.reply("Comando inválido");
  }
});

bot.login(process.env.BOT_TOKEN);
