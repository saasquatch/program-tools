import inquirer from 'inquirer';
import opn from 'opn';

import { log, error } from '../util/log';

const CLIENT_ID = process.env.PDCLI_CLIENT_ID || '';
const REDIRECT_URI = `https://google.ca`;
const AUTH_URL = `https://google.ca`;

export const login = async () => {
  if (CLIENT_ID === '') {
    log();
    error('Contentful client ID and secret were not loaded from env vars!');
    error('Aborting login');
    return null;
  }

  const confirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Open browser window now?',
    default: true
  }]);

  if (!confirmed.ready) {
    log('Log in aborted by the user.');
    return null;
  }

  await opn(AUTH_URL, {
    wait: false
  });

  log();
  log(`If your browser doesn't open automatically, open this URL:\n\n${AUTH_URL}\n`);

  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:',
    // validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
  }]);

  return answer.token;
};