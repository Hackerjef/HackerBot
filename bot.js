//datastufs
let config = require("./Data/config.json");
const Scriptpath = __dirname;
const fs = require("fs");
const DefaultChallangejson = require("./Data/src/defaultchallange.json");
const UserChallangejson = Scriptpath + "/Data/Userchallange.json";

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

//clean command
function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

//functions for writing to user chalange
const writechallange = require("./Data/src/writechallange.js");

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
    client.on(eventName, (...args) => eventFunction.run(Discord, client, config, UserChallangejson, ...args));
  })
});

//power
const power = function(client, config, message, type) {
  if (type == "shutdownforce") {
    client.destory();
    process.exit(4);
  } else if (type == "restartforce") {
    process.exit(5);
  } else if (type == "shutdown") {
    message.reply("goodbye~");
    console.log("shuting down bot~");
    client.destroy();
    process.exit(4);
  } else if (type == "restart") {
    message.reply("restarting bot~");
    console.info("restarting bot~");
    client.destroy();
    process.exit(5);
  } else if (type == "update") {
    message.reply("updating bot");
    console.info("updating bot~");
    client.destroy();
    process.exit(3);
  } else if (type == "fever") {
    message.channel.send("Lol not <@215525925465358336> smh");
  } else {
    message.reply("power type not provided/not correct");
  }
};
process.on("SIGINT", function () {
  process.stdin.resume();
  power("", "", "", "shutdownforce");
});
process.on("uncaughtException", function () {
  process.stdin.resume();
  power("", "", "", "restartforce");
});

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

  //eval command from anidiotsguide
  if (message.content.startsWith(config.prefix + "eval")) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
  if (message.content.startsWith(config.prefix + "eval")) return;

  //power sys
  if (command == "power") power(client, config, message, rawargs2);
  if (command == "power") return;

  //check of command file exists and lazy way of doing a 404
  let xD404 = require("./Data/src/404.js");

  //run command
  try {
    let commandFile = require(`./Data/commands/${command}.js`);
    commandFile.run(Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath, setgamepresence);
  } catch (err) {
    //command error
    console.error(err);
    xD404.run(client, message, err);
  }
});

client.login(config.discordtoken);