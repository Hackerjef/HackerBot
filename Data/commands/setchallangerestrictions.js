exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  writechallange.restrictions(UserChallangejson, args);
};