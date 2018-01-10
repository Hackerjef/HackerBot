exports.run = (Discord, client, message, args, DefaultChallangejson) => {
  const embed = new Discord.RichEmbed()
    .setTitle("__Map Name__ » " + DefaultChallangejson.set.mapname)
    .setAuthor("Challange Number " + DefaultChallangejson.set.challangenumber.number, DefaultChallangejson.set.challangenumber.filename)
    .setColor(DefaultChallangejson.set.Hexcolor)
    .setDescription(DefaultChallangejson.set.discription)
    .setFooter("Challenge By " + DefaultChallangejson.set.user.Discordname, DefaultChallangejson.set.user.Discordpic)
    .setImage(DefaultChallangejson.set.mapimage)
    .setThumbnail(DefaultChallangejson.set.extraimage)
    .addField("__Challenge Rules__ »", DefaultChallangejson.set.rules)
    .addField("__Rescrictions__ »", DefaultChallangejson.set.restrictions)
    .addField("Game »", DefaultChallangejson.set.game, true)
    .addField("Max Players »", DefaultChallangejson.set.maxplayers, true);

  message.channel.send({ embed });
};