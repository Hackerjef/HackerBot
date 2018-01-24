exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  var usr_id = message.mentions.members.first().user.id;
  var usr_pfpurl = message.mentions.members.first().user.displayAvatarURL.replace("?size=2048", "");
  var usr_name = message.mentions.members.first().user.username;
  message.reply("user set was: <@" + usr_id + "> and the username for it is `" + usr_name + "`" + "profile pic is:", {
    file: usr_pfpurl
  });
  writechallange.user(UserChallangejson, usr_name, usr_pfpurl);
};