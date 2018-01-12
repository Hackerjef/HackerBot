exports.run = (Discord, client, message) => {
    message.reply("The uptime is: `" + client.uptime + "`");
};