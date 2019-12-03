import * as yargs from "yargs";
import { version } from "../package.json";

yargs
  .usage("\nUsage: gherkindoc <cmd> [args]")
  .commandDir("cmd")
  .scriptName("gherkindoc")
  .recommendCommands()
  .option("v", {
    alias: "version",
    global: false,
    type: "boolean",
    describe: "Show current version",
    skipValidation: true
  })
  .version(false)
  .help("h")
  .alias("h", "help")
  .showHelpOnFail(true)
  .demandCommand(1, "Please specify a command")
  .parse(process.argv.slice(2), (_: any, argv: any, output: any) => {
    if (argv.version === true && !argv._.length) {
      console.log(version);
    } else {
      console.log(output);
    }
  });
