exports.run = (Discord, client, config) => {
  client.user.setPresence({ game: { name: config.currentgame, type: 0 } });
  console.log("Discord bot starting version: " + Discord.version);
};