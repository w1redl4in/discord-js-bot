const execute = (bot, message, args) => {
  return message.reply("Tá salvo");
};

module.exports = {
  name: "salve",
  help: "Te dá um salve",
  execute,
};
