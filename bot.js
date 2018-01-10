//data storage for bot stuff
const fs = require("fs");
const Scriptpath = __dirname;
const DefaultChallangejson = require("./Data/src/defaultchallange.json");
const UserChallangejson = Scriptpath + "/Data/Userchallange.json";

//bot events
var events = require("events");
var bot = new events.EventEmitter();
fs.readdir("./Data/src/Events/Bot/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./Data/src/Events/Bot/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    bot.on(eventName, (...args) => eventFunction.run(Discord, client, ...args));
  });
});


//set/get configs
let config = require("./Data/config.json");
let perms = require("./Data/perms.json");

// check if setup was compleate
if (config.donesetup == "no") {
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

//functions for writing to user chalange
const writechallange = require("./Data/src/writechallange.js")


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
    client.on(eventName, (...args) => eventFunction.run(Discord, client, config, ...args));
  });
});

//0 = noperm
//1 = allow perm
const permvalidator = function(perms, message, authorid, command) {
  //check if command is disabled
  if (perms.disabledcommands.indexOf(command) === 0) return 0;
  //check if user is banned
  if (perms.users_banperm.indexOf(authorid) === 0) return 0;
  //check if user has full perm
  if (perms.users_fullperm.indexOf(authorid) === 0) return 1;
  //check if command is allowed globaly
  if (perms.globalcommands.indexOf(command) === 0) return 1;
  //group perms

  //challange writers group
  var groupperm = 0;
  if (message.member.roles.has(perms.groupperm.ChallengeWriters.id)) {
    if (perms.groupperm.ChallengeWriters.indexOf(command) === 0) groupperm = 1;
  }
  if (groupperm == 1) return 1;

  //if everything else fails
  return 0;
};

client.on("message", (message) => {
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

  //permstuff
  if (permvalidator(perms, message, message.author.id, command) == 0) return;

  //check of command file exists and lazy way of doing a 404
  let xD404 = require("./Data/src/404.js");

  //run command
  try {
    let commandFile = require(`./Data/commands/${command}.js`);
    commandFile.run(Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath);
  } catch (err) {
    //command error
    console.error(err);
    xD404.run(client, message, err);
  }
});
client.login(config.discordtoken);