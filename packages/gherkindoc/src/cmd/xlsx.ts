const Excel = require('exceljs/modern.nodejs');
import XlsxPopulate from 'xlsx-populate';
import chalk from 'chalk';

import {generate as generateJson} from '../util/json';
import {styles} from '../util/styles';
import {isDir, gherkins, getOutputFileName, getAllPaths} from '../util/fio';
import {Arguments} from 'yargs';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const COLUMN_WIDTH_PADDING = 1.5;
const DESCRIPTION_HEIGHT_MULTIPLIER = 15;
const DESCRIPTION_HEIGHT_OFFSET = 15;

type CoordinateBase = {
  x: number;
  y: number;
};

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

  wbInit(wb, testers);
  json.features.forEach(f => {
    initFeatureSheet(wb, f.feature, testers);
  });
  wb.toFileAsync('./out.xlsx');
};

/**
 * Initializes the workbook table of contents page
 * with the appropriate columns for testers etc
 *
 * @param {Object} wb The workbook to initialize
 * @param {Number} testers The number of tester columns
 */
function wbInit(wb: any, testers: number): void {
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
 *
 * @param {Object} wb The workbook to add the sheet to
 * @param {Object} feature The feature for the sheet
 * @param {Number} testers The number of tester columns
 */
function initFeatureSheet(wb: any, feature: any, testers: number): void {
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

  printTags(sheet, feature.tags, {x: baseContentColumn + 1, y: 2});

  // Print tester columns
  for (let i = 1; i <= testers; i++) {
    sheet.cell(1, i).value(`Tester ${i}`);
  }

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

  if (feature.background) {
    printBlock(sheet, feature.background, {x: baseContentColumn + 1, y: 5});
  }
}

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} block The block to print
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The cursor Y position at the end of the insertion
 */
function printBlock(sheet: any, block: any, base: CoordinateBase): number {
  block.beforeComments.forEach((comment, idx) => {
    sheet
      .cell(base.y + idx, base.x)
      .value(comment)
      .style(styles.light);
  });

  sheet
    .cell(base.y + block.beforeComments.length, base.x)
    .value(block.name)
    .style(styles.bold);

  let currYIdx = base.y + 1 + block.beforeComments.length;

  block.steps.forEach(step => {
    step.beforeComments.forEach(comment => {
      sheet
        .cell(currYIdx, base.x + 1)
        .value(comment)
        .style(styles.light);

      currYIdx += 1;
    });

    sheet
      .cell(currYIdx, base.x + 1)
      .value(`${step.keyword} `)
      .style(styles.stepKeyword);

    sheet.cell(currYIdx, base.x + 2).value(step.text);
    currYIdx += 1;
  });

  return currYIdx;
}

/**
 * Prints a list of tags at the specified x and y coordinates
 *
 * @param {Object} sheet The sheet to print onto
 * @param {String[]} tags The tags to print
 * @param {CoordinateBase} base The base x and y coordinates
 */
function printTags(sheet: any, tags: string[], base: CoordinateBase): void {
  sheet
    .cell(base.y, base.x)
    .value('Tags:')
    .style(styles.light);

  sheet
    .cell(base.y, base.x + 1)
    .value(tags.join(' '))
    .style(styles.light);
}
