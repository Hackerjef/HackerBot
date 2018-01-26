exports.run = (console, Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  var request = require("request");
  var types = {
    jpg: "ffd8ffe0",
    png: "89504e47",
    gif: "47494638"
  };
  var options = {
    method: "GET",
    url: args,
    encoding: null // keeps the body as buffer
  };
  request(options, function (err, response, body) {
    if (!err && response.statusCode == 200) {
      var magigNumberInBody = body.toString("hex", 0, 4);
      if (magigNumberInBody == types.jpg || magigNumberInBody == types.png || magigNumberInBody == types.gif) {
        //works send it
        writechallange.mapimage(UserChallangejson, args);
      } else {
        message.reply("not a valid image");
      }
    }
  });
};