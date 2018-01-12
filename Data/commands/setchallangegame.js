exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.game(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangegame <gamename>",
    description: "sets embeded game",
  };
};