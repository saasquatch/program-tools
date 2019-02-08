import inquirer from 'inquirer';

import { update as updateConfig } from '../util/config';
import { log, error } from '../util/log';

export const command = 'space';
export const desc = 'Choose which Contentful space to use';

const LIVE_ID = process.env.PDCLI_SPACE_ID_LIVE || '';
const TEST_ID = process.env.PDCLI_SPACE_ID_TEST || '';

/**
 * Prompts the user for their choice of Contentful space.
 * This also decides whether or not Webtask code is
 * uplaoded as `staging`
 *
 * @param {Object} argv Command arguments from Yargs
 */
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

  const args = argv._;
  let choice;

  if (args.length === 1) {
    switch (args[0]) {
      case 'live':
        choice = spaceChoices[0].value;
        break;
      case 'test':
        choice = spaceChoices[1].value;
        break;
      default:
        choice = undefined;
    }
  }

  if (choice === undefined) {
    const answer = await inquirer.prompt([{
      type: 'list',
      name: 'space',
      message: 'Which space would you like to use?',
      choices: spaceChoices
    }]);

    choice = answer.space;
  }

  await updateConfig('space', choice);
  log();
  log(`Environment sucessfully set to '${choice.name}'`);
};

export const handler = space;
