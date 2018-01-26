exports.run = (console, Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  console.info("reseting userchallange.json to def");
  writechallange.reset(DefaultChallangejson, UserChallangejson);
  message.reply("sucessfull");
};