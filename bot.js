const console = require("./Data/src/js/terminal.js"); // eslint-disable-line no-global-assign
const writechallange = require("./Data/src/js/writechallange.js");
const responces = require("./Data/src/js/responces.js");
require("./Data/src/js/rootblock.js");

//datastufs
let config = require("./Data/config.json");
const Scriptpath = __dirname;
const fs = require("fs");
const wildstring = require("wildstring");
const DefaultChallangejson = require("./Data/src/defaultchallange.json");
const UserChallangejson = Scriptpath + "/Data/Userchallange.json";

//wit
const { Wit, log } = require("node-wit");
const witclient = new Wit({
  accessToken: config.witaitoken,
  logger: new log.Logger(log.DEBUG) // optional
});

//perms stuffs
const permjson = require("./Data/perms.json");
const perm = require("./Data/src/js/Perms.js");

// check if setup was compleate
if (config.donesetup == "False") {
  console.error("Setup not correct please correct kthx bai");
  console.warn("https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token");
  console.log("go into Data/config.json, set donesetup to yes and then set the token");
  process.exit(1);
}

//start of script from stack overflow https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate

/**
 * Removes a module from the cache
 */
function purgeCache(moduleName) {
  // Traverse the cache looking for the files
  // loaded by the specified module name
  searchCache(moduleName, function (mod) {
    delete require.cache[mod.id];
  });

  // Remove cached paths to the module.
  // Thanks to @bentael for pointing this out.
  Object.keys(module.constructor._pathCache).forEach(function (cacheKey) {
    if (cacheKey.indexOf(moduleName) > 0) {
      delete module.constructor._pathCache[cacheKey];
    }
  });
}

/**
 * Traverses the cache to search for all the cached
 * files of the specified module name
 */
function searchCache(moduleName, callback) {
  // Resolve the module identified by the specified name
  var mod = require.resolve(moduleName);

  // Check if the module has been resolved and found within
  // the cache
  if (mod && ((mod = require.cache[mod]) !== undefined)) {
    // Recursively go over the results
    (function traverse(mod) {
      // Go over each of the module's children and
      // traverse them
      mod.children.forEach(function (child) {
        traverse(child);
      });

      // Call the specified callback providing the
      // found cached module
      callback(mod);
    }(mod));
  }
}
// end of script from stack overflow https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate

//timer stuff
const Timer = require("timer.js");
var myTimer = new Timer({
  tick: 1,
});

// set game status
var setgamepresence = function(game) {
  const updateJsonFile = require("update-json-file");
  updateJsonFile("./Data/config.json", (data) => {
    data.currentgame = game;
    return data;
  });
  client.user.setPresence({ game: { name: game, type: 0 } });
};

//main bot lol i want to die
const Discord = require("discord.js");
const client = new Discord.Client();

//events for Discord
fs.readdir("./Data/src/Events/Discord/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./Data/src/Events/Discord/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(console, Discord, client, config, UserChallangejson, ...args));
  });
});

//if killed by ctrl + c
process.on("SIGINT", function () {
  process.stdin.resume();
  client.destroy();
  process.exit(4);
});

//loging perp
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
//client.on("debug", (e) => console.info(e));

//autoscript
client.on("message", (message) => {
  let xD404 = require("./Data/src/js/404.js");
  // Exit and stop if it's not there
  if (!message.content.startsWith(config.prefix)) return;

  if (message.content == config.prefix) return;
  // if bot is the sender (Botception)

  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  //get args n stuffs
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const rawargs = message.content;
  var remove = config.prefix + command + " ";
  const rawargs2 = rawargs.replace(remove, "");

  //check if command file exists
  if (!fs.existsSync(`./Data/commands/${command}.js`)) {
    console.command(command, message, 0);
    message.react("❌");
    if (message.author.id == "104376018222972928") {
      message.channel.send("!weenie <@104376018222972928>");
    }
    return;
  }
  //perms
  if (perm.check(console, permjson, message, command) == 0) {
    message.react("❌");
    console.command(command, message, 0);
    return;
  }
  console.command(command, message, 1);

  //run command
  try {
    let commandFile = require(`./Data/commands/${command}.js`);
    commandFile.run(console, Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath, setgamepresence, perm, permjson);
  } catch (err) {
    //command error
    console.error(err);
    xD404.run(console, client, message, err);
  }
});

//ONLY FOR MENTIONS
client.on("message", (message) => {
  if (!message.mentions.users.exists("id",client.user.id)) return;
  if (message.author.bot) {
    message.channel.send("I dont listen to you.");
    return;
  }
  //wit.ai stuff
  var clientmsg = message.content;
  clientmsg = clientmsg.replace("<@!394996632422449153> ","");
  clientmsg = clientmsg.replace("<@394996632422449153> ", "");
  witclient.message(clientmsg, {})
    .then((data) => {
      witproccess(JSON.stringify(data));
    })
    .catch(console.error);
  var witproccess = function (jsondata) {
    var obj = JSON.parse(jsondata);
    var value = obj.entities.intent[0].value;
    //check if their was a responce to begin with
    if (value == undefined) {
      message.reply(responces.idk());
      console.warn("no responce from wit.ai");
      return;
    }
    //check if its a botcommand
    if (wildstring.match("bot*", value)) {
      value = value.toLowerCase();
      message.reply("this is not finnished yet");
      return;
    }
    //other stuff
    switch (value) {
    default:
      message.reply(responces.idk());
    }
  };
});

//login to the bot
client.login(config.discordtoken);