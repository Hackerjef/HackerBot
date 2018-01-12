exports.run = (Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath, setgamepresence) => {
  setgamepresence(rawargs2);
};

exports.help = () => {
  return {
    command: "setgame <game>",
    description: "sets bot game that its playing",
  };
};