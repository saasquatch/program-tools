import XlsxPopulate from 'xlsx-populate';
import chalk from 'chalk';

import { generate as generateJson } from '../util/json';
import { setupTable } from '../util/xlsx';
import { styles } from '../util/styles';
import { isDir, gherkins, getOutputFileName, getAllPaths } from '../util/fio';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const NUM_CONTENT_ROWS = 30;
const COLUMN_WIDTH_PADDING = 1.5;

export const handler = async (argv: any) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log('Wrong number of arguments.');
    console.log('Pass a .feature file or directory.');
    return;
  }

  const outFile = getOutputFileName(argv.out);
  const files = isDir(args[0]) ? gherkins(args[0]) : [args[0]];
  const json = await generateJson(files);
  const wb = await XlsxPopulate.blankFromAsync();
  const testers = argv.testers || 0;
  const toc: any = {};

  wb.creator = `${json.configuration.program} v${json.configuration.version}`;
  wb.created = new Date(json.configuration.generatedOnTimestamp);
  wb.modified = new Date(json.configuration.generatedOnTimestamp);

  wb.addSheet('TOC');

  json.features.forEach((feature: any) => {
    const name = feature.feature.name.replace(/\s/g, '').toUpperCase();
    const ws = wb.addSheet(name);
    const maxWidths: any = {};

    const allRelativePaths = getAllPaths(feature.relativeFolder);
    let curr = toc;

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
        curr = curr[path];
      }
    });

    curr.sheets.push({name, id: ws.id});

    // ws.state = 'visible';
    // ws.views = [{
    //   state: 'frozen',
    //   ySplit: 1
    // }];

    setupTable(ws, name, testers, NUM_CONTENT_ROWS, maxWidths);

    if (feature.feature.tags.length > 0) {
      ws.addRow({content0: 'Tags:', content1: feature.feature.tags.join(', ')});
      ws.lastRow.font = styles.light;
    }

    ws.addRow();

    if (feature.feature.description) {
      ws.addRow({content0: feature.feature.description.replace(/\n +/g, '\n').trim()});
      ws.lastRow.height = (feature.feature.description.split(/\r\n|\r|\n/).length - 1) * 11 + 15;
      ws.addRow();
    }

    feature.feature.featureElements.forEach((scenario: any) => {
      genScenarioContent(ws, scenario, testers, maxWidths);
    });

    for (const key in maxWidths) {
      ws.getColumn(key).width = maxWidths[key] + COLUMN_WIDTH_PADDING;
    }
  });

  genTocTable(wb, toc, testers);

  wb.xlsx.writeFile(outFile)
    .then(() => {
      console.log(`${chalk.green('Success')}: Sheets generated & written to ${outFile}`);
    })
    .catch((err: Error) => {
      console.log(`${chalk.red('ERROR')}: ${err.message}`);
    });
};

const genTocTable = (wb: XlsxPopulate.workBook, toc: any, testers: number) => {
  const ws = wb.getWorksheet('TOC');
  setupTable(ws, 'Sections', testers, NUM_CONTENT_ROWS, {});
  generateSheetStructure(ws, toc, 0);
};

/* _recursive_ */
const generateSheetStructure = (ws: XlsxPopulate.workSheet, dir: any, indentLevel: number) => {
  for (let key in dir) {
    ws.addRow({name: dir[key].title});

    dir[key].sheets.forEach((sheet: any) => {
      ws.addRow({
        [`content${indentLevel}`]: {
          text: sheet.name,
          hyperlink: `#'${sheet.name}'.A1`
        }
      });

      console.log(ws.lastRow.getCell(4).value);
    });

    for (let subkey in dir.subdirs) {
      generateSheetStructure(ws, dir.subdirs[subkey], indentLevel + 1);
    }
  }
};

const genScenarioContent = (ws: XlsxPopulate.workSheet, scenario: any, testers: number, maxWidths: any) => {
  scenario.beforeComments.forEach((comment: any) => {
    ws.addRow({content0: comment});
    ws.lastRow.font = styles.light;
  });

  ws.addRow({content0: scenario.name});
  ws.lastRow.font = styles.bold;

  if (scenario.tags) {
    ws.addRow({content0: 'Tags:', content1: scenario.tags.join(', ')});
    ws.lastRow.font = styles.light;
  }

  ws.addRow();

  scenario.steps.forEach((step: any) => {
    genStepContent(ws, step, testers, maxWidths);
  });

  if (scenario.examples.length > 0) {
    ws.addRow();
  }

  scenario.examples.forEach((example: any) => {
    genExampleTable(ws, example, testers || 0, maxWidths);
  });

  scenario.afterComments.forEach((comment: any) => {
    ws.addRow({content0: comment});
    ws.lastRow.font = styles.light;
  });

  ws.addRow();
};

const genStepContent = (ws: XlsxPopulate.workSheet, step: any, testers: number, maxWidths: any) => {
  step.beforeComments.forEach((comment: any) => {
    ws.addRow({content1: comment});
    ws.lastRow.font = styles.light;
  });

  ws.addRow({content1: step.rawKeyword, content2: step.text});
  ws.lastRow.getCell(3 + testers).font = styles.bold;
  ws.lastRow.getCell(3 + testers).alignment = styles.keywordAlignment;

  step.afterComments.forEach((comment: any) => {
    ws.addRow({content1: comment});
    ws.lastRow.font = styles.light;
  });

  if (step.dataTable) {
    genDataTable(ws, step.dataTable, testers || 0, maxWidths);
  }
};

const genExampleTable = (ws: XlsxPopulate.workSheet, example: any, testers: number, maxWidths: any) => {
  example.beforeComments.forEach((comment: any) => {
    ws.addRow({content0: comment});
    ws.lastRow.font = styles.light;
  });

  ws.addRow({content0: 'Examples:'});
  const headerRow: any = {};
  const cellsToStyle: any[] = [];

  example.header.forEach((header: any, index: any) => {
    const key = `content${index + 2}`;
    headerRow[key] = header;
    if (maxWidths[key] < header.toString().length) {
      maxWidths[key] = header.toString().length;
    }
    cellsToStyle.push(index + 4 + testers);
  });

  ws.addRow(headerRow);
  ws.lastRow.font = styles.boldItalic;

  cellsToStyle.forEach(cellNum => {
    ws.lastRow.getCell(cellNum).fill = styles.blueFill;
    ws.lastRow.getCell(cellNum).border = styles.fullBorder;
  });

  example.data.forEach((row: any) => {
    const cellsToStyle: any[] = [];
    const contentRow: any = {};

    row.forEach((entry: any, index: any) => {
      const key = `content${index + 2}`;
      contentRow[key] = entry;

      if (maxWidths[key] < entry.toString().length) {
        maxWidths[key] = entry.toString().length;
      }

      cellsToStyle.push(index + 4 + testers);
    });

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });

  example.afterComments.forEach((comment: any) => {
    ws.addRow({content0: comment});
    ws.lastRow.font = styles.light;
  });
};

const genDataTable = (ws: XlsxPopulate.workSheet, table: any[], testers: number, maxWidths: any) => {
  if (table.length === 0) {
    return;
  }

  const headerRow: any = {};
  const cellsToStyle: any[] = [];

  table[0].forEach((header: any, index: any) => {
    const key = `content${index + 2}`;
    headerRow[key] = header;

    if (maxWidths[key] < header.toString().length) {
      maxWidths[key] = header.toString().length;
    }

    cellsToStyle.push(index + 4 + testers);
  });

  ws.addRow(headerRow);
  ws.lastRow.font = styles.boldItalic;

  cellsToStyle.forEach(cellNum => {
    ws.lastRow.getCell(cellNum).fill = styles.blueFill;
    ws.lastRow.getCell(cellNum).border = styles.fullBorder;
  });

  table.shift();
  table.forEach((row: any)=> {
    const cellsToStyle: any[] = [];
    const contentRow: any = {};

    row.forEach((entry: any, index: any) => {
      const key = `content${index + 2}`;
      contentRow[key] = entry;

      if (maxWidths[key] < entry.toString().length) {
        maxWidths[key] = entry.toString().length;
      }

      cellsToStyle.push(index + 4 + testers);
    });

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });
};
