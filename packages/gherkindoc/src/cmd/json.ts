import { generate as generateJson } from '../util/json';
import { isDir, gherkins } from '../util/fio';

export const command = 'json';
export const desc = 'Parse the provided file or directory into JSON';

export const handler = async (argv) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log('Wrong number of arguments.');
    console.log('Pass a .feature file or directory.');
    return;
  }

  const files = isDir(args[0])
    ? gherkins(args[0])
    : [args[0]];

  const json = await generateJson(files);
  console.log(JSON.stringify(json, undefined, 2));
};
