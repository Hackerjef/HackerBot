exports.run = (console, Discord, client, config) => {
  
  client.user.setPresence({ game: { name: config.currentgame, type: 0 } });
  console.rainbow("Discord bot starting version: " + Discord.version);

};