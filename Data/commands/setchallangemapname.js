exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.mapname(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangemapname <name>",
    description: "sets map name",
  };
};