import moment from 'moment';

import { parse } from './parser';
import { version } from '../../package.json';

export const generate = async (files) => {
  return new Promise((resolve, reject) => {
    const stream = parse(files);

    let json = {
      features: [],
      summary: {
        tags: [],
        folders: [],
        notTestedFolders: [],
        scenarios: {
          total: 0,
          passing: 0,
          failing: 0,
          inconclusive: 0
        },
        features: {
          total: 0,
          passing: 0,
          failing: 0,
          inconclusive: 0
        }
      },
      configuration: {
        program: 'gherkindoc',
        version: version,
        generatedOn: moment().format(),
        generatedOnTimestamp: moment().valueOf()
      }
    };

    stream.on('data', chunk => {
      const feature = chunk.gherkinDocument.feature;

      let tmp = {
        relativeFolder: chunk.gherkinDocument.uri,
        feature: {
          name: feature.name,
          description: feature.description,
          featureElements: [],
          tags: feature.tags.map(tag => tag.name),
          result: {
            wasExecuted: false,
            wasSuccessful: false,
            wasProvided: false
          }
        },
        result: {
          wasExecuted: false,
          wasSuccessful: false,
          wasProvided: false
        }
      };

      feature.children.forEach(child => {
        json.summary.scenarios.total += 1;
        json.summary.scenarios.inconclusive += 1;
        const examples = child.scenario.examples
          ? child.scenario.examples.map(example => ({
            header: example.tableHeader.cells.map(cell => cell.value),
            data: example.tableBody.map(e => e.cells.map(cell => cell.value))
          }))
          : [];

        const steps = child.scenario.steps.map(step => {
          const stepObj = {
            keyword: step.keyword.trim(),
            rawKeyword: step.keyword,
            text: step.text,
            stepComments: [],
            afterLastStepComments: []
          };

          if (step.dataTable) {
            stepObj.dataTable = step.dataTable.rows.map(row => {
              return row.cells.map(cell => cell.value);
            });
          }

          return stepObj;
        });

        tmp.feature.featureElements.push({
          steps,
          examples,
          name: child.scenario.name,
          description: child.scenario.description || '',
          tags: child.scenario.tags.map(tag => tag.name),
          result: {
            wasExecuted: false,
            wasSuccessful: false,
            wasProvided: false
          }
        });
      });

      json.features.push(tmp);
      json.summary.features.total += 1;
      json.summary.features.inconclusive += 1;
    });

    stream.on('error', err => {
      reject(err);
    });

    stream.on('finish', () => {
      resolve(json);
    });
  });
};
