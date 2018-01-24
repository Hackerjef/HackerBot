let config = require(`${process.argv.slice(2)}`);
if (config.updatestartup == "True") process.exit(3);
process.exit();

