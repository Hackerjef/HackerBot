exports.mapname = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.mapname = ver;
    return data;
  });
};

exports.challangenumber = (file, number, filename) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.challangenumber.number = number;
    data.set.challangenumber.filename = filename;
    return data;
  });
};

exports.hexcolor = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.Hexcolor = ver;
    return data;
  });
};

exports.description = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.discription = ver;
    return data;
  });
};

exports.rules = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.rules = ver;
    return data;
  });
};

exports.restrictions = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.restrictions = ver;
    return data;
  });
};

exports.game = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.game = ver;
    return data;
  });
};

exports.maxplayers = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.maxplayers = ver;
    return data;
  });
};

exports.user = (file, Discordname, Discordpic) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.user.Discordname = Discordname;
    data.set.user.Discordpic = Discordpic;
    return data;
  });
};

exports.mapimage = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.mapimage = ver;
    return data;
  });
};

exports.extraimage = (file, ver) => {
  const updateJsonFile = require("update-json-file");
  updateJsonFile(file, (data) => {
    data.set.extraimage = ver;
    return data;
  });
};

exports.reset = (defaultchalllangejson, userchalllangejson) => {
  var fs = require("fs");
  //fs.createReadStream(defaultchalllangejson).pipe(fs.createWriteStream(userchalllangejson));
  console.log("this is fucking broken; fix")
}