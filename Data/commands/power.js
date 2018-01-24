exports.run = (Discord, client, message, type) => {
  if (type == "shutdownforce") {
    client.destory();
    process.exit(4);
  } else if (type == "restartforce") {
    process.exit(5);
  } else if (type == "shutdown") {
    message.reply("goodbye~");
    console.log("shuting down bot~");
    client.destroy();
    process.exit(4);
  } else if (type == "restart") {
    message.reply("restarting bot~");
    console.info("restarting bot~");
    client.destroy();
    process.exit(5);
  } else if (type == "update") {
    message.reply("updating bot");
    console.info("updating bot~");
    client.destroy();
    process.exit(3);
  } else if (type == "fever") {
    message.channel.send("Lol not <@215525925465358336> smh");
  } else {
    message.reply("power type not provided/not correct");
    message.react("405784682546855936");
  }
};