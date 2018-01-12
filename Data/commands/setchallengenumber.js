exports.run = (Discord, client, message, args, DefaultChallangejson, UserChallangejson, purgeCache, myTimer, writechallange) => {
  //needs number url
  //needs number
  var number = 90;
  var filename = 90;
  if (args == 1) {
    number = 1;
    filename = "1.png";
  } else if (args == 2) {
    number = 2;
    filename = "2.png";
  } else if (args == 3) {
    number = 3;
    filename = "3.png";
  } else if (args == 4) {
    number = 4;
    filename = "4.png";
  } else if (args == 5) {
    number = 5;
    filename = "5.png";
  } else if (args == 6) {
    number = 6;
    filename = "6.png";
  } else if (args == 7) {
    number = 7;
    filename = "7.png";
  } else if (args == 8) {
    number = 8;
    filename = "8.png";
  } else if (args == 9) {
    number = 9;
    filename = "9.png";
  } else if (args == 10) {
    number = 10;
    filename = "10.png";
  } else if (args == 11) {
    number = 11;
    filename = "11.png";
  } else if (args == 12) {
    number = 12;
    filename = "12.png";
  } else if (args == 13) {
    number = 13;
    filename = "13.png";
  } else if (args == 14) {
    number = 14;
    filename = "14.png";
  } else if (args == 15) {
    number = 15;
    filename = "15.png";
  } else if (args == 16) {
    number = 16;
    filename = "16.png";
  } else if (args == 17) {
    number = 17;
    filename = "17.png";
  } else if (args == 18) {
    number = 18;
    filename = "18.png";
  } else if (args == 19) {
    number = 19;
    filename = "19.png";
  } else if (args == 20) {
    number = 20;
    filename = "20.png";
  } else {
    console.log("we got a idiot overhere!");
  }

  if (number == 90) {
    message.reply("number not shown");
  } else {
    writechallange.challangenumber(UserChallangejson, number, filename);
  }
};

exports.help = () => {
  return {
    command: "setchallangenumber <1-20>",
    description: "The challange number-sets number and pic",
  };
};