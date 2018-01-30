exports.run = (console, Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath, setgamepresence, perm, permjson) => {
  message.reply(JSON.stringify(perm.get(client, permjson, rawargs2)));
};