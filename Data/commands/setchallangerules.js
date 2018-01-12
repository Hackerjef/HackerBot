exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.rules(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangerules <rules>",
    description: "sets rules",
  };
};