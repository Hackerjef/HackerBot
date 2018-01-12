exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.maxplayers(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangeplayers <players>",
    description: "sets player ammount",
  };
};