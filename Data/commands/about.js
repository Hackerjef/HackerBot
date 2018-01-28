exports.run = (console, Discord, client, message) => {
  const embed = new Discord.RichEmbed()
    .setTitle("A Discordbot Made by Nadie#0063")
    .setAuthor("challangebot", client.user.avatarURL)
    .setColor(5301186)
    .setDescription("This bot is For zombie challanges~ And honestly this is the first bot that I ever made with sucess w/ the [source on github](https://github.com/Hackerjef/challangebot)")
    .setURL("https://hackerjef.github.io")
    .setThumbnail("https://hackerjef.github.io/Downloads/invisible.png")
    .setFooter("© Weenie Bot by @Nadie#0063", client.user.avatarURL)
    .addField("Command Prefix »", "?", true)
    .addField("Commands »", "we have alot of commands bot well not documented, check for commands folder in the repo for a list :", true)
    .setImage("https://hackerjef.github.io/Downloads/invisible.png");
  message.channel.send({ embed });
};