import yargs from 'yargs';
import '@babel/polyfill';
import { version } from '../package.json';

// Load vars from .env
require('dotenv').config();

yargs
  .usage('\nUsage: pdcli <cmd> [args]')
  .commandDir('cmd')
  .strict()
  .scriptName('pdcli')
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
      console.log(version);
    } else {
      console.log(output);
    }
  });
