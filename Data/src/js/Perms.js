module.exports = {
  check: function (console, permjson, message, command) {
    //check if perm system is enabled
    if (permjson.permsenabled == false) return 1;

    var checkinarray = function(array, veriable) {
      var isinarray = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] == veriable) {
          isinarray = true;
          break;
        }
      }
      if (isinarray == true) return 1;
      return 0;
    };
    //check if command is disabled
    if (checkinarray(permjson.disabledcommads, command) == 1) return 0;
    //check if user is banned from using commands
    if (checkinarray(permjson.noidperm, message.author.id) == 1) return 0;
    //check if command is global
    if (checkinarray(permjson.globalcommands, command) == 1) return 1;
    //check if user has full perm
    if (checkinarray(permjson.Fullidperm, message.author.id) == 1) return 1;
    
    //group stuff
    //see if user is in a  group/check if command will work in said group, if not loop to next one
    for (var i = 0; i < permjson.permgroups.groupnames.length; i++) {
      var groupname = permjson.permgroups.groupnames[i];
      if (message.member.roles.has(permjson.permgroups[groupname].id) && checkinarray(permjson.permgroups[groupname].commands, command) == 1) return 1;
    }

    //user stuff
    for (var ai = 0; ai < permjson.userpermgroups.usergroupnames.length; ai++) {
      var usergroupname = permjson.userpermgroups.usergroupnames[ai];
      if (checkinarray(permjson.userpermgroups[usergroupname].ids, message.author.id) == 1 && checkinarray(permjson.userpermgroups[usergroupname].commands, command) == 1) return 1;
    }

    //if nothing works just block them lmao
    return 0;
  },
  get: function (client, permjson, type) {

    var checkinarray = function (array, veriable) {
      var isinarray = false;
      for (var i = 0; i < array.length; i++) {
        if (array[i] == veriable) {
          isinarray = true;
          break;
        }
      }
      if (isinarray == true) return 1;
      return 0;
    };

    if (permjson.permsenabled == false) return 1;
    var data;
    if (type == "allowedcommands") {
      data = permjson.globalcommands.toString();
      return data;
    } else if (type == "deniedcommands") {
      data = permjson.disabledcommands.toString();
      return data;
    } else if (type == "Fullperm") {
      data = {};
      data["fullperm"] = [];
      for (var i = 0; i < permjson.Fullidperm.length; i++) {
        data["fullperm"].push(permjson.Fullidperm[i]);
      }
      return data;
    } else if (type == "noperm") {
      data = {};
      data["noperm"] = [];
      for (var ia = 0; ia < permjson.noidperm.length; ia++) {
        data["noperm"].push(permjson.noidperm[ia]);
      }
      return data;
    } else if (checkinarray(permjson.permgroups.groupnames, type) == 1) {
      data = {};
      data["groupname"] = type;
      data["groupid"] = permjson.permgroups[type].id;
      data["groupcommands"] = [];
      for (var iaa = 0; iaa < permjson.permgroups[type].commands.length; iaa++) {
        data["groupcommands"].push(permjson.permgroups[type].commands[iaa]);
      }
      return data;
    } else if (checkinarray(permjson.userpermgroups.usergroupnames, type) == 1) {
      data = {};
      data["groupname"] = type;
      data["ids"] = [];
      data["groupcommands"] = [];
      for (var iaaa = 0; iaaa < permjson.userpermgroups[type].commands.length; iaaa++) {
        data["groupcommands"].push(permjson.userpermgroups[type].commands[iaaa]);
      }
      for (var iaaaa = 0; iaaaa < permjson.userpermgroups[type].ids.length; iaaaa++) {
        //permjson.userpermgroups[type].ids[i]
        //data["users"].push(user + discrim);
        client.fetchUser(permjson.userpermgroups[type].ids[iaaaa]).then(user => {
          console.log(user.username)
        });
        // var userend = User.username + "#" + User.discriminator;
        //data["ids"].push(userend);
      }
      return data;
    }
    //send
    return ["invalid group given"];
  }
};
