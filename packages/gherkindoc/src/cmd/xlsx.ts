const Excel = require('exceljs/modern.nodejs');
import XlsxPopulate from 'xlsx-populate';
import chalk from 'chalk';

import {generate as generateJson} from '../util/json';
import {styles} from '../util/styles';
import {isDir, gherkins, getOutputFileName, getAllPaths} from '../util/fio';
import {Arguments} from 'yargs';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const NUM_CONTENT_ROWS = 30;
const COLUMN_WIDTH_PADDING = 1.5;
const DESCRIPTION_HEIGHT_MULTIPLIER = 15;
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

  const XlsxPopulate = require('xlsx-populate');
  const wb = await XlsxPopulate.fromBlankAsync();

  console.log(json);

  wbInit(wb, testers);
  json.features.forEach(f => {
    initFeatureSheet(wb, f.feature, testers);
  });
  wb.toFileAsync('./out.xlsx');
};

/**
 * Initializes the workbook table of contents page
 * with the appropriate columns for testers etc
 */
function wbInit(wb, testers): void {
  const toc = wb.sheet(0);
  toc
    .name('TOC')
    .cell('A1')
    .value('New/TODO');

  toc.row(1).style(styles.bold);

  for (let i = 1; i <= testers; i++) {
    toc.cell(1, i + 1).value(`Tester ${i}`);
  }

  toc.cell(1, testers + 2).value('Sections');
  toc.freezePanes(0, 1);
}

/**
 * Creates a new sheet in the workbook for the provided
 * feature file
 */
function initFeatureSheet(wb, feature, testers): void {
  const baseContentColumn = testers + 2;

  const sheet = wb.addSheet(
    feature.name
      .replace(/\s+/g, '')
      .slice(0, 31)
      .toUpperCase(),
  );

  // Configure the title row
  sheet.freezePanes(0, 1);
  sheet
    .cell(1, baseContentColumn)
    .value(feature.name)
    .style(styles.bold);

  for (let i = 1; i <= testers; i++) {
    sheet.cell(1, i).value(`Tester ${i}`);
  }

  // Display the feature file tags
  sheet
    .cell(2, baseContentColumn + 1)
    .value('Tags:')
    .style(styles.light);

  sheet
    .cell(2, baseContentColumn + 2)
    .value(feature.tags.join(' '))
    .style(styles.light);

  if (feature.description) {
    // Place the feature description in the box below the tags
    sheet
      .cell(3, baseContentColumn + 1)
      .value(feature.description.replace(/\n +/g, '\n').trim());

    // The height of the description row needs to be adjusted
    // so that all lines are visible
    sheet
      .row(3)
      .height(
        (feature.description.split(/\r\n|\r|\n/).length - 1) *
          DESCRIPTION_HEIGHT_MULTIPLIER +
          DESCRIPTION_HEIGHT_OFFSET,
      );
  }

  console.log(feature.background);
  console.log(feature.featureElements[0].steps);
}
