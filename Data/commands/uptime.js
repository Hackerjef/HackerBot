exports.run = (Discord, client, message) => {
  message.reply("The uptime is: `" + client.uptime + "`");
};

exports.help = () => {
  return {
    command: "uptime",
    description: "current uptime of bot",
  };
};