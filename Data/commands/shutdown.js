exports.run = (Discord, client, message, args) => {
    message.reply("goodbye :Heart:")
    console.log("Shuting down bot");
    client.destroy();
    process.exit(1);
};