var configjson = process.argv.slice(2) + "/Data/config.json";
let config = require(`${configjson}`);
if (config.update.updatestartup == "True") process.exit(3);
process.exit();