exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.description(UserChallangejson, args);
};

exports.help = () => {
  return {
    command: "setchallangedescription <description>",
    description: "sets description",
  };
};