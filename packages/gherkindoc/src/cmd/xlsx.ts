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

type TableOfContents = {
  [key: string]: TOCEntry;
};

type TOCEntry = {
  title: string;
  sheets: string[];
  subdirs: TableOfContents;
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

  let toc: TableOfContents = {};

  wbInit(wb, testers);
  json.features.forEach(f => {
    const allRelativePaths = getAllPaths(f.relativeFolder);
    let curr = toc;

    // Use the parsed path stack to traverse the TOC tree
    allRelativePaths.forEach((path, index) => {
      if (!curr[path]) {
        curr[path] = {
          title: path,
          sheets: [],
          subdirs: {},
        };
      }

      if (index < allRelativePaths.length - 1) {
        curr = curr[path].subdirs;
      } else {
        curr[path].sheets.push(f.feature.name);
      }
    });

    printFeatureSheet(wb, f.feature, testers);
  });
  printTOC(wb.sheet('TOC'), toc, {x: testers + 2, y: 2});
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

function printTOC(
  sheet: any,
  toc: TableOfContents,
  base: CoordinateBase,
): void {
  let height = 1;
  for (const key in toc) {
    sheet
      .cell(base.y, base.x)
      .value(toc[key].title)
      .style(styles.bold);

    toc[key].sheets.forEach((s, idx) => {
      sheet
        .cell(base.y + idx + 1, base.x + 1)
        .value(s)
        .style(styles.hyperlink)
        .hyperlink(`${getSheetName(s)}!A1`);
      height += 1;
    });
    height += 1;
  }

  for (const subkey in toc.subdirs) {
    printTOC(sheet, toc.subdir[subkey], {
      x: base.x + 1,
      y: base.y + height + 1,
    });
  }
}

/**
 * Creates a new sheet in the workbook for the provided
 * feature file. The tester columns are added to the
 * left of the sheet, and the Title, Tags, and background
 * (if present) are added.
 *
 * Each "block" of the feature is printed iteratively
 *
 * @param {Object} wb The workbook to add the sheet to
 * @param {Object} feature The feature for the sheet
 * @param {Number} testers The number of tester columns
 */
function printFeatureSheet(wb: any, feature: any, testers: number): void {
  const baseContentColumn = testers + 2;

  const sheet = wb.addSheet(getSheetName(feature.name));

  // Configure the title row
  sheet.freezePanes(0, 1);
  sheet
    .cell(1, baseContentColumn)
    .value(feature.name)
    .style(styles.bold);

  printTags(sheet, feature.tags, {x: baseContentColumn, y: 2});

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

  let currYIdx = 5;
  if (feature.background) {
    currYIdx += printBlock(sheet, feature.background, {
      x: baseContentColumn,
      y: currYIdx,
    });
  }

  feature.featureElements.forEach(scenario => {
    currYIdx += printBlock(sheet, scenario, {
      x: baseContentColumn,
      y: currYIdx,
    });
  });
}

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} block The block to print
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The number of rows inserted by the operation
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
  if (block.tags.length > 0) {
    printTags(sheet, block.tags, {x: base.x, y: currYIdx});
    currYIdx += 1;
  }

  currYIdx += 1;

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
    if (step.dataTable.length > 0) {
      currYIdx += printDataTable(sheet, step.dataTable, {
        x: base.x + 2,
        y: currYIdx,
      });
    }
  });

  block.examples.forEach(example => {
    example.beforeComments.forEach((comment, idx) => {
      sheet
        .cell(currYIdx + idx, base.x)
        .value(comment)
        .style(styles.light);
    });
    currYIdx += example.beforeComments.length + 1;

    sheet
      .cell(currYIdx, base.x)
      .value('Examples')
      .style(styles.normal);

    currYIdx += 1;
    currYIdx += printExampleTable(sheet, example, {x: base.x + 2, y: currYIdx});
  });

  return currYIdx - base.y + 1;
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

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} block The block to print
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The number of rows inserted by the operation
 */
function printDataTable(
  sheet: any,
  table: string[][],
  base: CoordinateBase,
): number {
  table.shift().forEach((col, idx) => {
    sheet
      .cell(base.y, base.x + idx)
      .value(col)
      .style(styles.tableHeader);
  });

  table.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      sheet
        .cell(base.y + rIdx + 1, base.x + cIdx)
        .value(col)
        .style(styles.tableCell);
    });
  });

  return table.length + 1;
}

function printExampleTable(
  sheet: any,
  table: any,
  base: CoordinateBase,
): number {
  table.header.forEach((col, idx) => {
    sheet
      .cell(base.y, base.x + idx)
      .value(col)
      .style(styles.tableHeader);
  });

  table.data.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      sheet
        .cell(base.y + rIdx + 1, base.x + cIdx)
        .value(col)
        .style(styles.tableCell);
    });
  });

  return table.length + 1;
}

function getSheetName(feature: string): string {
  return feature
    .replace(/\s+/g, '')
    .slice(0, 31)
    .toUpperCase();
}
