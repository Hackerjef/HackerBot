exports.run = (Discord, client, message) => {
  message.reply("dab on the haters!");
};

exports.help = () => {
  return {
    command: "dab",
    description: "dab on the haters",
  };
};