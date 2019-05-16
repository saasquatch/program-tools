"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const package_json_1 = require("../package.json");
yargs
    .usage('\nUsage: gherkindoc <cmd> [args]')
    .commandDir('cmd')
    .scriptName('gherkindoc')
    .recommendCommands()
    .option('v', {
    alias: 'version',
    global: false,
    type: 'boolean',
    describe: 'Show current version',
    skipValidation: true
})
    .version(false)
    .help('h')
    .alias('h', 'help')
    .showHelpOnFail(true)
    .demandCommand(1, 'Please specify a command')
    .parse(process.argv.slice(2), (_, argv, output) => {
    if (argv.version === true && !argv._.length) {
        console.log(package_json_1.version);
    }
    else {
        console.log(output);
    }
});
