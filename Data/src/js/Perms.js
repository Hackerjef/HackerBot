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
      if (checkinarray(permjson.userpermgroups[usergroupname].id, message.author.id) == 1 && checkinarray(permjson.userpermgroups[usergroupname].commands, command) == 1) return 1;
    }

    //if nothing works just block them lmao
    return 0;
  }
};
