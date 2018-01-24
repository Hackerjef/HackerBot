exports.run = (Discord, client, message, args) => {
  if (!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args}.js`)];
  console.info(`The command ${args} has been reloaded`);
  message.reply(`The command ${args} has been reloaded`);
};