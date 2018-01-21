exports.run = (Discord, client, message, args) => {
  message.channel.send(args);
};

exports.help = () => {
  return {
    command: "say",
    description: "make the bot say shit",
  };
};