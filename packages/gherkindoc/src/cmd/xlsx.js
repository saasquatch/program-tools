import Excel from 'exceljs';

import { generate as generateJson } from '../util/json';
import { isDir, gherkins } from '../util/fio';
import { version } from '../../package.json';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const NUM_CONTENT_ROWS = 30;
const COLUMN_WIDTH_PADDING = 1.5;
const styles = {
  bold: {
    name: 'Calibri',
    bold: true
  },
  boldItalic: {
    name: 'Calibri',
    bold: true,
    italic: true
  },
  light: {
    name: 'Calibri',
    italic: true,
    color: {
      argb: 'FF404040'
    }
  },
  keywordAlignment: {
    vertical: 'bottom',
    horizontal: 'right'
  },
  blueFill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {
      argb: 'FFF0F8FF'
    }
  },
  fullBorder: {
    top: {
      style:'thin'
    },
    left: {
      style:'thin'
    },
    bottom: {
      style:'thin'
    },
    right: {
      style:'thin'
    }
  }
};

export const handler = async (argv) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log('Wrong number of arguments.');
    console.log('Pass a .feature file or directory.');
    return;
  }

  const files = isDir(args[0]) ? gherkins(args[0]) : [args[0]];
  const json = await generateJson(files);

  const wb = new Excel.Workbook();

  wb.creator = `${json.configuration.program} v${version}`;
  wb.created = new Date(json.configuration.generatedOnTimestamp);
  wb.modified = new Date(json.configuration.generatedOnTimestamp);

  const testers = argv.testers || 0;

  json.features.map(feature => feature.feature).forEach(feature => {
    const name = feature.name;
    const ws = wb.addWorksheet(name);
    const maxWidths = {};

    ws.state = 'show';
    ws.views = [{
      state: 'frozen',
      ySplit: 1
    }];

    const wscolumns = [
      {header: name, key: 'name', width: 9}
    ];

    for (let i = 0; i < testers; i++) {
      const text = `Tester ${i+1}`;
      wscolumns.unshift({header: text, key: `tester${i}`, width: text.legnth});
    }

    for (let i = 0; i < NUM_CONTENT_ROWS; i++) {
      const key = `content${i}`;
      wscolumns.push({header: '', key, width: 9});

      if (i > 1) {
        maxWidths[key] = 9;
      }
    }

    ws.columns = wscolumns;
    ws.getRow(1).font = styles.bold; // Set the top row to bold (rows are 1-indexed...)

    if (feature.tags.length > 0) {
      ws.addRow({content0: 'Tags:', content1: feature.tags.join(', ')});
      ws.lastRow.font = styles.light;
    }

    ws.addRow();

    if (feature.description) {
      ws.addRow({content0: feature.description.replace(/\n +/g, '\n').trim()});
      ws.lastRow.height = (feature.description.split(/\r\n|\r|\n/).length - 1) * 11 + 15;
      ws.addRow();
    }

    feature.featureElements.forEach(scenario => {
      scenario.beforeComments.forEach(comment => {
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

      scenario.steps.forEach(step => {
        genStepContent(ws, step, testers, maxWidths);
      });

      if (scenario.examples.length > 0) {
        ws.addRow();
      }

      scenario.examples.forEach(example => {
        example.beforeComments.forEach(comment => {
          ws.addRow({content0: comment});
          ws.lastRow.font = styles.light;
        });

        genExampleTable(ws, example, testers || 0, maxWidths);

        example.afterComments.forEach(comment => {
          ws.addRow({content0: comment});
          ws.lastRow.font = styles.light;
        });
      });

      scenario.afterComments.forEach(comment => {
        ws.addRow({content0: comment});
        ws.lastRow.font = styles.light;
      });

      ws.addRow();
    });

    for (let key in maxWidths) {
      ws.getColumn(key).width = maxWidths[key] + COLUMN_WIDTH_PADDING;
    }
  });

  await wb.xlsx.writeFile('output.xlsx');
};

const genStepContent = (ws, step, testers, maxWidths) => {
  step.beforeComments.forEach(comment => {
    ws.addRow({content1: comment});
    ws.lastRow.font = styles.light;
  });

  ws.addRow({content1: step.rawKeyword, content2: step.text});
  ws.lastRow.getCell(3 + testers).font = styles.bold;
  ws.lastRow.getCell(3 + testers).alignment = styles.keywordAlignment;

  step.afterComments.forEach(comment => {
    ws.addRow({content1: comment});
    ws.lastRow.font = styles.light;
  });

  if (step.dataTable) {
    genDataTable(ws, step.dataTable, testers || 0, maxWidths);
  }
};

const genExampleTable = (ws, example, testers, maxWidths) => {
  ws.addRow({content0: 'Examples:'});
  const headerRow = {};
  const cellsToStyle = [];

  for (let i = 0; i < example.header.length; i++) {
    const key = `content${i+2}`;
    headerRow[key] = example.header[i];
    if (maxWidths[key] < example.header[i].toString().length) {
      maxWidths[key] = example.header[i].toString().length;
    }
    cellsToStyle.push(i + 4 + testers);
  }

  ws.addRow(headerRow);
  ws.lastRow.font = styles.boldItalic;

  cellsToStyle.forEach(cellNum => {
    ws.lastRow.getCell(cellNum).fill = styles.blueFill;
    ws.lastRow.getCell(cellNum).border = styles.fullBorder;
  });

  example.data.forEach(row => {
    const cellsToStyle = [];
    const contentRow = {};

    for (let i = 0; i < row.length; i++) {
      const key = `content${i+2}`;
      contentRow[key] = row[i];

      if (maxWidths[key] < row[i].toString().length) {
        maxWidths[key] = row[i].toString().length;
      }

      cellsToStyle.push(i + 4 + testers);
    }

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });
};

const genDataTable = (ws, table, testers, maxWidths) => {
  if (table.length === 0) {
    return;
  }

  const headerRow = {};
  const cellsToStyle = [];

  for (let i = 0; i < table[0].length; i++) {
    const key = `content${i+2}`;
    headerRow[key] = table[0][i];

    if (maxWidths[key] < table[0][i].toString().length) {
      maxWidths[key] = table[0][i].toString().length;
    }

    cellsToStyle.push(i + 4 + testers);
  }

  ws.addRow(headerRow);
  ws.lastRow.font = styles.boldItalic;

  cellsToStyle.forEach(cellNum => {
    ws.lastRow.getCell(cellNum).fill = styles.blueFill;
    ws.lastRow.getCell(cellNum).border = styles.fullBorder;
  });

  table.shift();

  table.forEach(row => {
    const cellsToStyle = [];
    const contentRow = {};

    for (let i = 0; i < row.length; i++) {
      const key = `content${i+2}`;
      contentRow[key] = row[i];

      if (maxWidths[key] < row[i].toString().length) {
        maxWidths[key] = row[i].toString().length;
      }

      cellsToStyle.push(i + 4 + testers);
    }

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });
};
