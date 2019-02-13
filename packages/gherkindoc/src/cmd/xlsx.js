import XLSX from 'xlsx';
import { generate as generateJson } from '../util/json';
import { isDir, gherkins } from '../util/fio';

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

  // const ws = XLSX.utils.json_to_sheet([
  //   { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
  //   { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
  // ], {header:['S','h','e','e_1','t','J','S_1']});

  const featureNameKey = json.features[0].feature.name;
  
  let sheetJson = [
    {feature: featureNameKey, content1: '', content2: '', content3: ''},
  ];

  json.features[0].feature.featureElements.forEach(scenario => {
    sheetJson.push({feature: '', content1: scenario.name, content2: '', content3: ''});
    sheetJson.push({feature: '', content1: '', content2: '', content3: ''});

    if (scenario.tags) {
      sheetJson.push({feature: '', content1: 'Tags: ', content2: scenario.tags.join(', '), content3: ''});
    }

    scenario.steps.forEach(step => {
      sheetJson.push({feature: '', content1: step.keyword, content2: step.text, content3: ''});
    });

    sheetJson.push({feature: '', content1: '', content2: '', content3: ''});
  });

  const ws = XLSX.utils.json_to_sheet(sheetJson, {header: ['feature', 'content1', 'content2', 'content3'], skipHeader: true});

  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Table one');

  XLSX.writeFile(wb, 'output.xlsx');

  // console.log(json);
};
