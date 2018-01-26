exports.run = (console, Discord, client, message) => {
  var prettyMs = require("pretty-ms");
  message.reply("The uptime is: `" + prettyMs(client.uptime) + "`");
};