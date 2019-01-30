import inquirer from 'inquirer';

import { update as updateConfig } from '../util/config';
import { log, error } from '../util/log';

export const command = 'space';
export const desc = 'Choose which Contentful space to use';

const LIVE_ID = process.env.PDCLI_SPACE_ID_LIVE || '';
const TEST_ID = process.env.PDCLI_SPACE_ID_TEST || '';

const space = async (argv) => {
  argv._.shift();

  if (!LIVE_ID || !TEST_ID) {
    log();
    error('Space IDs were not found in env vars.');
    log();
    log('Exiting.');
    return;
  }

  const spaceChoices = [
    {
      name: 'Product (LIVE)',
      value: {
        name: 'Product (LIVE)',
        id: LIVE_ID,
        live: true
      }
    },
    {
      name: 'Product (TEST)',
      value: {
        name: 'Product (TEST)',
        id: TEST_ID,
        live: false
      }
    }
  ];

  const answer = await inquirer.prompt([{
    type: 'list',
    name: 'space',
    message: 'Which space would you like to use?',
    choices: spaceChoices
  }]);

  await updateConfig('space', answer.space);
};

export const handler = space;