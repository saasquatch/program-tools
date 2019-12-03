import * as XlsxPopulate from "xlsx-populate";
import { RichText } from "xlsx-populate";

import { generate as generateJson } from "../util/json";
import { styles } from "../util/styles";
import { isDir, gherkins, getOutputFileName, getAllPaths } from "../util/fio";
import { Arguments } from "yargs";

export const command = "xlsx";
export const desc = "Parse the provided file or directory into XLSX";

const DESCRIPTION_HEIGHT_MULTIPLIER = 14;
const DESCRIPTION_HEIGHT_OFFSET = 15;
const MAX_COL_WIDTH_PADDING = 1.6;

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

type MaxWidths = {
  [key: number]: number;
};

export const handler = async (argv: Arguments) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log("Wrong number of arguments.");
    console.log("Pass a .feature file or directory.");
    return;
  }

  console.log("Generating spreadsheet...");

  // const outFile = getOutputFileName(argv.out as string);
  const outFile = "./out.xlsx";
  const files = isDir(args[0]) ? gherkins(args[0]) : [args[0]];
  const json = await generateJson(files);
  const testers = (argv.testers as number) || 0;

  const wb = await XlsxPopulate.fromBlankAsync();
  const toc: TableOfContents = {};

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
          subdirs: {}
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

  let height = 2;
  const tocKeys = Object.keys(toc);
  if (tocKeys.length === 1 && toc[tocKeys[0]].sheets.length === 0) {
    for (const key in toc[tocKeys[0]].subdirs) {
      height += printTOC(wb.sheet("TOC"), toc[tocKeys[0]].subdirs[key], {
        x: testers + 2,
        y: height
      });
    }
  } else {
    for (const key in toc) {
      height += printTOC(wb.sheet("TOC"), toc[key], {
        x: testers + 2,
        y: height
      });
    }
  }

  wb.toFileAsync(outFile);
  console.log("Finished.");
  console.log(`Workbook written to ${outFile}`);
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
    .name("TOC")
    .cell("A1")
    .value("New/TODO");

  toc.row(1).style(styles.bold);

  for (let i = 1; i <= testers; i++) {
    toc.cell(1, i + 1).value(`Tester ${i}`);
  }

  toc.cell(1, testers + 2).value("Sections");
  toc.freezePanes(0, 1);
}

/**
 * Recursively prints the table of contents onto the
 * provided sheet
 *
 * @param {Object} sheet The sheet to print onto
 * @param {TableOfContents} toc The table of contents
 * @param {CoordinateBase} base The base coordinates
 *
 * @return {Number} The number of lines printed
 */
function printTOC(sheet: any, toc: TOCEntry, base: CoordinateBase): number {
  let height = 0;
  sheet
    .cell(base.y, base.x)
    .value(toc.title)
    .style(styles.bold);

  toc.sheets.forEach((s, idx) => {
    sheet
      .cell(base.y + idx + 1, base.x + 1)
      .value(s)
      .style(styles.hyperlink)
      .hyperlink(`${getSheetName(s)}!A1`);
  });

  height += toc.sheets.length;

  for (const subkey in toc.subdirs) {
    height += printTOC(sheet, toc.subdirs[subkey], {
      x: base.x + 1,
      y: base.y + height + 1
    });
  }

  return height + 1;
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
  const maxWidths: MaxWidths = {};

  // Configure the title row
  sheet.freezePanes(0, 1);
  sheet
    .cell(1, baseContentColumn)
    .value(feature.name)
    .style(styles.bold);

  let currYIdx = 2;
  if (feature.tags.length > 0) {
    printTags(sheet, feature.tags, { x: baseContentColumn, y: currYIdx });
    currYIdx += 1;
  }

  // Print tester columns
  for (let i = 1; i <= testers; i++) {
    sheet.cell(1, i).value(`Tester ${i}`);
  }

  if (feature.description) {
    // Place the feature description in the box below the tags
    printLongtext(sheet, feature.description.replace(/\n +/g, "\n").trim(), {
      x: baseContentColumn + 1,
      y: currYIdx
    });
    currYIdx += 1;
  }

  currYIdx += 1;

  feature.featureElements.forEach(element => {
    if (testers > 0 && element.elementType.startsWith("Scenario")) {
      for (let i = 1; i <= testers; i++) {
        sheet
          .cell(currYIdx, i)
          .value("Pending")
          .style(styles.notTested);
      }
    }

    currYIdx += printBlock(sheet, element, maxWidths, {
      x: baseContentColumn + 1,
      y: currYIdx
    });
  });
}

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} block The block to print
 * @param {MaxWidths} maxWidths A table of the max cell widths
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The number of rows inserted by the operation
 */
function printBlock(
  sheet: any,
  block: any,
  maxWidths: MaxWidths,
  base: CoordinateBase
): number {
  block.beforeComments.forEach((comment, idx) => {
    sheet
      .cell(base.y + idx, base.x)
      .value(comment)
      .style(styles.light);
  });

  sheet
    .cell(base.y + block.beforeComments.length, base.x)
    .value(`${block.elementType}: ${block.name}`)
    .style(styles.bold);

  let currYIdx = base.y + 1 + block.beforeComments.length;
  if (block.tags.length > 0) {
    printTags(sheet, block.tags, { x: base.x, y: currYIdx });
    currYIdx += 1;
  }

  const { description } = block;
  if (description) {
    // Place the feature description in the box below the tags
    printLongtext(sheet, description.replace(/\n +/g, "\n").trim(), {
      x: base.x,
      y: currYIdx
    });
    currYIdx += 1;
  }

  currYIdx += 1;

  block.steps.forEach(step => {
    // Comments
    step.beforeComments.forEach(comment => {
      sheet
        .cell(currYIdx, base.x + 1)
        .value(comment)
        .style(styles.light);

      currYIdx += 1;
    });

    // Step keyword
    sheet
      .cell(currYIdx, base.x + 1)
      .value(`${step.keyword} `)
      .style(styles.stepKeyword);

    // Step text
    const textCell = sheet.cell(currYIdx, base.x + 2);
    textCell.value(new RichText());

    step.text.split(/(<\w+>)/g).forEach(chunk => {
      const style = chunk.match(/<\w+>/) ? styles.template : styles.normal;
      textCell.value().add(chunk, style);
    });

    // Step data table (if present)
    currYIdx += 1;
    if (step.dataTable.length > 0) {
      currYIdx += printDataTable(sheet, step.dataTable, maxWidths, {
        x: base.x + 2,
        y: currYIdx
      });
    }

    if (step.docString) {
      printLongtext(sheet, step.docString.content, {
        x: base.x + 1,
        y: currYIdx
      });
      currYIdx += 1;
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
      .value("Examples")
      .style(styles.normal);

    currYIdx += 1;
    currYIdx += printExampleTable(sheet, example, maxWidths, {
      x: base.x + 2,
      y: currYIdx
    });
  });

  return currYIdx - base.y + 1;
}

function printLongtext(sheet: any, text: string, base: CoordinateBase): void {
  // sheet.cell(base.y, base.x).value(text.replace(/\n +/g, '\n').trim());
  sheet.cell(base.y, base.x).value(text);
  // The height of the description row needs to be adjusted
  // so that all lines are visible
  sheet
    .row(base.y)
    .height(
      (text.split(/\r\n|\r|\n/).length - 1) * DESCRIPTION_HEIGHT_MULTIPLIER +
        DESCRIPTION_HEIGHT_OFFSET
    );
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
    .value("Tags:")
    .style(styles.light);

  sheet
    .cell(base.y, base.x + 1)
    .value(tags.join(" "))
    .style(styles.light);
}

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} block The block to print
 * @param {MaxWidths} maxWidths A table of the max cell widths
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The number of rows inserted by the operation
 */
function printDataTable(
  sheet: any,
  table: string[][],
  maxWidths: MaxWidths,
  base: CoordinateBase
): number {
  table.shift().forEach((col, idx) => {
    const x = base.x + idx;
    updateMaxWidths(sheet, maxWidths, x, col.length);

    sheet
      .cell(base.y, base.x + idx)
      .value(col)
      .style(styles.tableHeader);
  });

  table.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      const x = base.x + cIdx;
      updateMaxWidths(sheet, maxWidths, x, col.length);

      sheet
        .cell(base.y + rIdx + 1, base.x + cIdx)
        .value(col)
        .style(styles.tableCell);
    });
  });

  return table.length + 1;
}

/**
 * Prints a "block" of the feature file (a block is either a Background, Rule,
 * Scenario, or Scenario Outline).
 *
 * @param {Object} sheet The sheet to print onto
 * @param {Object} table The table to print
 * @param {MaxWidths} maxWidths A table of the max cell widths
 * @param {CoordinateBase} base The x and y coordinates to start at
 *
 * @return {Number} The number of rows inserted by the operation
 */
function printExampleTable(
  sheet: any,
  table: any,
  maxWidths: MaxWidths,
  base: CoordinateBase
): number {
  table.header.forEach((col, idx) => {
    const x = base.x + idx;
    updateMaxWidths(sheet, maxWidths, x, col.length);

    sheet
      .cell(base.y, base.x + idx)
      .value(col)
      .style(styles.tableHeader);
  });

  table.data.forEach((row, rIdx) => {
    row.forEach((col, cIdx) => {
      const x = base.x + cIdx;
      updateMaxWidths(sheet, maxWidths, x, col.length);

      sheet
        .cell(base.y + rIdx + 1, base.x + cIdx)
        .value(col)
        .style(styles.tableCell);
    });
  });

  return table.data.length + 1;
}

/**
 * Transforms a feature file name into a usable
 * sheet name
 *
 * @param {String} feature The name of the feature
 *
 * @return {String} The transformed sheet name
 */
function getSheetName(feature: string): string {
  return feature
    .replace(/\s+/g, "")
    .replace(/[\\/*[\]:?]/g, "_")
    .slice(0, 31)
    .toUpperCase();
}

/**
 * Checks to see if the provided width is larger than the
 * current max for the given column and updates the table
 * accordingly
 *
 * @param {Object} sheet The sheet to update
 * @param {MaxWidths} maxWidths The maxWidths table
 * @param {Number} col The column to check
 * @param {Number} x The width to compare
 */
function updateMaxWidths(
  sheet: any,
  maxWidths: MaxWidths,
  col: number,
  x: number
): void {
  if (!maxWidths[col] || x > maxWidths[col]) {
    maxWidths[col] = x;
    sheet.column(col).width(x);
  }
}
