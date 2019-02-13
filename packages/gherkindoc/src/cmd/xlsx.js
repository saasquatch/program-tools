import Excel from 'exceljs';

import { generate as generateJson } from '../util/json';
import { isDir, gherkins } from '../util/fio';
import { version } from '../../package.json';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

const NUM_CONTENT_ROWS = 30;
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

  for (let i = 0; i < json.features.length; i++) {

    const name = json.features[i].feature.name;
    const ws = wb.addWorksheet(name);

    let wscolumns = [
      {header: name, key: 'name', width: 9}
    ];

    const testers = argv.testers || 0;

    for (let i = 0; i < testers; i++) {
      const text = `Tester ${i+1}`;
      wscolumns.unshift({header: text, key: `tester${i}`, width: text.legnth});
    }

    for (let i = 0; i < NUM_CONTENT_ROWS; i++) {
      wscolumns.push({header: '', key: `content${i}`, width: 9});
    }

    ws.columns = wscolumns;
    ws.getRow(1).font = styles.bold; // Set the top row to bold (rows are 1-indexed........)
    ws.addRow();

    json.features[i].feature.featureElements.forEach(scenario => {
      ws.addRow({content0: scenario.name});
      ws.lastRow.font = styles.bold;

      if (scenario.tags) {
        ws.addRow({content0: 'Tags:', content1: scenario.tags.join(', ')});
        ws.lastRow.font = styles.light;
      }

      ws.addRow();

      scenario.steps.forEach(step => {
        step.stepComments.forEach(comment => {
          ws.addRow({content1: comment});
          ws.lastRow.getCell(3 + testers).font = styles.light;
        });

        ws.addRow({content1: step.rawKeyword, content2: step.text});
        ws.lastRow.getCell(3 + testers).font = styles.bold;
        ws.lastRow.getCell(3 + testers).alignment = styles.keywordAlignment;

        if (step.dataTable) {
          genDataTable(ws, step.dataTable, testers || 0);
        }

        step.afterLastStepComments.forEach(comment => {
          ws.addRow({content1: comment});
          ws.lastRow.getCell(3 + testers).font = styles.light;
        });
      });


      if (scenario.examples.length > 0) {
        ws.addRow();
      }

      scenario.examples.forEach(example => {
        genExampleTable(ws, example, testers || 0);
      });

      ws.addRow();
    });
  }

  await wb.xlsx.writeFile('output.xlsx');
};

const genExampleTable = (ws, example, testers) => {
  ws.addRow({content0: 'Examples:'});
  let headerRow = {};
  let cellsToStyle = [];

  for (let i = 0; i < example.header.length; i++) {
    headerRow[`content${i+2}`] = example.header[i];
    cellsToStyle.push(i + 4 + testers);
  }

  ws.addRow(headerRow);
  ws.lastRow.font = styles.boldItalic;

  cellsToStyle.forEach(cellNum => {
    ws.lastRow.getCell(cellNum).fill = styles.blueFill;
    ws.lastRow.getCell(cellNum).border = styles.fullBorder;
  });

  example.data.forEach(row => {
    let cellsToStyle = [];
    let contentRow = {};

    for (let i = 0; i < row.length; i++) {
      contentRow[`content${i+2}`] = row[i];
      cellsToStyle.push(i + 4 + testers);
    }

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });
};

const genDataTable = (ws, table, testers) => {
  if (table.length === 0) {
    return;
  }

  let headerRow = {};
  let cellsToStyle = [];

  for (let i = 0; i < table[0].length; i++) {
    headerRow[`content${i+2}`] = table[0][i];
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
    let cellsToStyle = [];
    let contentRow = {};

    for (let i = 0; i < row.length; i++) {
      contentRow[`content${i+2}`] = row[i];
      cellsToStyle.push(i + 4 + testers);
    }

    ws.addRow(contentRow);

    cellsToStyle.forEach(cellNum => {
      ws.lastRow.getCell(cellNum).border = styles.fullBorder;
    });
  });
}
