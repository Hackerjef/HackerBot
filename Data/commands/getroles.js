exports.run = (Discord, client, message) => {
  var discordrolesarray = message.channel.guild.roles.array();
  var i;
  var output;
  for (i = 0; i < discordrolesarray.length; i++) {
    var name = discordrolesarray[i].name;
    var id = discordrolesarray[i].id;
    output = output + name + ": " + id + "\n";
    output = output.replace("undefined","");
  }
  message.reply("```" + output + "```");
};