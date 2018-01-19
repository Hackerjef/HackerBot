exports.run = (Discord, client, message) => {
    var usr_id = message.mentions.members.first().user.id;
    message.channel.send("you need to fix it <@" + usr_id + ">");
};

exports.help = () => {
    return {
        command: "fixit",
        description: "Why is this person gay",
    };
};