exports.run = (console, Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath, setgamepresence, perm, permjson) => {
//JSON.stringify(perm.get(client, permjson, rawargs2))
  var stuff = JSON.parse(JSON.stringify(perm.get(client, permjson, rawargs2)));
  const permissionCheck = new Discord.RichEmbed()
    .setTitle("Permissions For Group »")
    .setAuthor("Weenie Bot Permissions Check", client.user.avatarURL, "https://github.com/ThatGuyJustin/oofbot")
    .setColor(5301186)
    .setDescription("`" + stuff.groupname + "`")
    .setThumbnail("https://i.imgur.com/pfteJh6.jpg")
    .setFooter("© Weenie Bot by @Justin🐢#1337 & @Nadie#0063", "https://i.imgur.com/f67xlD4.png")
    .addField("**Commands** »", stuff.groupcommands, false)
    .addField("**Users** »", stuff.users, false);

  message.channel.send({ embed: permissionCheck });
};