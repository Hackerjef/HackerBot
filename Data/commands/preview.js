exports.run = (Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath) => {
  //require and get things
  var userchallange = require(UserChallangejson);
  var numberpic = UserChallangejson;
  numberpic = Scriptpath + "/Data/src/numbers/" + userchallange.set.challangenumber.filename;
  const embed = new Discord.RichEmbed()
    .setTitle("__Map__ » " + userchallange.set.mapname)
    .setAuthor("Challange Number " + userchallange.set.challangenumber.number, "attachment://number.png")
    .setColor(userchallange.set.Hexcolor)
    .setDescription(userchallange.set.discription)
    .setFooter("Challenge By " + userchallange.set.user.Discordname, userchallange.set.user.Discordpic)
    .setImage(userchallange.set.mapimage)
    .setThumbnail(userchallange.set.extraimage)
    .addField("__Challenge Rules__ »", userchallange.set.rules)
    .addField("__Rescrictions__ »", userchallange.set.restrictions)
    .addField("Game »", userchallange.set.game, true)
    .addField("Max Players »", userchallange.set.maxplayers, true);
    //time to deleate msg 10 sec
  message.channel.send({ embed, files: [{ attachment: numberpic, name: "number.png" }] });
  purgeCache(UserChallangejson);
};

exports.help = () => {
  return {
    command: "preview",
    description: "previews the user generated embeded",
  };
};