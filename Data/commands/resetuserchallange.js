exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  console.info("reseting userchallange.json to def");
  writechallange.reset(DefaultChallangejson, UserChallangejson);
  message.reply("sucessfull");
};

exports.help = () => {
  return {
    command: "resetuserchallange",
    description: "resets user generated embed to default",
  };
};