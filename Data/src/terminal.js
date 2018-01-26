//terminal stuffs
exports.warn = function (msg) {
  var chalk = require("chalk");
  console.warn(chalk.yellow(msg));
};
exports.log = function (msg) {
  var chalk = require("chalk");
  console.log(chalk.white(msg));
};
exports.info = function (msg) { 
  var chalk = require("chalk");
  console.info(chalk.blue(msg));
};
exports.error = function (msg) {
  var chalk = require("chalk");
  console.error(chalk.red(msg));
};
exports.command = function (command, message, permtype) { 
  var chalk = require("chalk");
  var perm;
  if (permtype == 1) {
    perm = chalk.green("[✓]");
  } else if (permtype == 0){
    perm = chalk.red("[X]");
  }
  console.log(perm + " User " + message.author.username + "#" + message.author.discriminator + " used " + message);
};
exports.rainbow = function (msg) {
  var chalkRainbow = require("chalk-rainbow");
  console.log(chalkRainbow(msg));
};