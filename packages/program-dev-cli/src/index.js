import yargs from 'yargs';

yargs.usage('\nUsage: contentful <cmd> [args]')
  .commandDir('cmd')
  .demandCommand(4, 'Please specify a command.')
  .help('h')
  .alias('h', 'help')
  .strict()
  .recommendCommands()
  .option('v', {
    alias: 'version',
    global: false,
    type: 'boolean',
    describe: 'Show current version',
    skipValidation: true
  })
  .version(false)
  .fail(function (msg, err, yargs) {
    if (err) throw err
    console.error(msg)
    process.exit(1)
  })
  .parse(process.argv.slice(2), (_, argv, output) => {
    if (argv.version === true && !argv._.length) {
      console.log(version)
    } else {
      console.log(output)
    }
})