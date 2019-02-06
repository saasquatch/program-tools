import moment from 'moment';

import { parse } from '../util/parser';
import { version } from '../../package.json';
import { isDir, gherkins } from '../util/fio';

export const command = 'json';
export const desc = 'Parse the provided file or directory into JSON';

export const handler = (argv) => {
  argv._.shift();

  const args = argv._;

  if (args.length !== 1) {
    console.log('Wrong number of arguments.');
    console.log('Pass a .feature file or directory.');
    return;
  }

  const files = isDir(args[0])
    ? gherkins(args[0])
    : [args[0]];

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
    // console.log(Object.keys(chunk.gherkinDocument.uri));
    // console.log(chunk.gherkinDocument.uri);

    const feature = chunk.gherkinDocument.feature;

    let tmp = {
      relativeFolder: chunk.gherkinDocument.uri,
      feature: {
        name: feature.name,
        description: feature.description,
        featureElements: [],
        tags: feature.tags,
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
      tmp.feature.featureElements.push({
        examples: child.scenario.examples || [],
        name: child.scenario.name,
        description: child.scenario.description || '',
        steps: child.scenario.steps.map(step => ({
          keyword: step.keyword.trim(),
          rawKeyword: step.keyword,
          text: step.text,
          comments: [],
          afterLastStepComments: []
        })),
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

  stream.on('finish', () => {
    console.log(json);
  });
};
