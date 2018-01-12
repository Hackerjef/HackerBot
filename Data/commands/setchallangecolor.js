exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.hexcolor(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangecolor <hexcolor",
    description: "sets color",
  };
};