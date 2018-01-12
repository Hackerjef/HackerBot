exports.run = (Discord, client, message, rawargs2, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange, Scriptpath) => {
  var fs = require("fs");
  var commandpath = Scriptpath + "/Data/commands/";
  var filecount = 0;
  var files = [];
  var helpjson = {};
  const commands = function(file) {
    filecount = filecount +1;
    files.push(file);
  };
  fs.readdirSync(commandpath).forEach( file => {
    commands(file);
  });
  for (var i = 0; i < filecount; i++) {
    //files[i]
    var commandhelp = commandpath + files[i];
    let commandFile = require(`${commandhelp}`);
    var command = commandFile.help();
    //todo: add command w/ all return data to global helpjson
    // sample json: name > nameveriable description args
  }

  //todo: make embeded outputing helpjson
};

exports.help = () => {
  return {
    command: "help",
    description: "Displays this file",
    args: "none"
  };
};