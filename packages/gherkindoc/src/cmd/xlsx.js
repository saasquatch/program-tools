import Excel from 'exceljs';

import { generate as generateJson } from '../util/json';
import { isDir, gherkins } from '../util/fio';
import { version } from '../../package.json';

export const command = 'xlsx';
export const desc = 'Parse the provided file or directory into XLSX';

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

  let wb = new Excel.Workbook();

  wb.creator = `${json.configuration.program} v${version}`;
  wb.created = new Date(json.configuration.generatedOnTimestamp);
  wb.modified = new Date(json.configuration.generatedOnTimestamp);

  const name = json.features[0].feature.name;

  let ws = wb.addWorksheet(name);

  const styles = {
    bold: {
      name: 'Calibri',
      bold: true
    },
    light: {
      name: 'Calibri',
      italic: true,
      color: {
        argb: 'FF505050'
      }
    }
  };

  ws.columns = [
    { header: name, key: 'name', width: name.length},
    { header: '', key: 'content1', width: 11},
    { header: '', key: 'content2', width: 11},
    { header: '', key: 'content3', width: 11}
  ];

  ws.getRow(1).getCell(1).font = styles.bold;

  json.features[0].feature.featureElements.forEach(scenario => {
    ws.addRow({content1: scenario.name});
    ws.lastRow.font = styles.bold;

    if (scenario.tags) {
      ws.addRow({content1: 'Tags: ', content2: scenario.tags.join(', ')});
      ws.lastRow.font = styles.light;
    }

    ws.addRow();

    scenario.steps.forEach(step => {
      ws.addRow({content1: step.keyword, content2: step.text});
      ws.lastRow.getCell(2).font = styles.bold;
    });

    ws.addRow();
  });

  await wb.xlsx.writeFile('output.xlsx');
};
