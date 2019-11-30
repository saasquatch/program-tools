const Excel = require('exceljs/modern.nodejs');
import XlsxPopulate from 'xlsx-populate';
import chalk from 'chalk';

import {generate as generateJson} from '../util/json';
import {setupTable} from '../util/xlsx';
import {styles} from '../util/styles';
import {isDir, gherkins, getOutputFileName, getAllPaths} from '../util/fio';
import {Arguments} from 'yargs';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const NUM_CONTENT_ROWS = 30;
const COLUMN_WIDTH_PADDING = 1.5;
const DESCRIPTION_HEIGHT_MULTIPLIER = 11;
const DESCRIPTION_HEIGHT_OFFSET = 15;

export const handler = async (argv: Arguments) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log('Wrong number of arguments.');
    console.log('Pass a .feature file or directory.');
    return;
  }

  const outFile = getOutputFileName(argv.out as string);
  const files = isDir(args[0]) ? gherkins(args[0]) : [args[0]];
  const json = await generateJson(files);
  const testers = (argv.testers as number) || 0;

  console.log(json.features[0].feature);
};
