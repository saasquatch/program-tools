import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';

import { log, error } from '../util/log';

const CLIENT_ID = process.env.PDCLI_CONTENTFUL_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PDCLI_CONTENTFUL_CLIENT_SECRET || '';
const REDIRECT_URI = `https://www.contentful.com/developers/cli-oauth-page/`;
const AUTH_URL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;

/**
 * Logs prompts the user for their Contentful login token
 *
 * @return {String} The token
 */
export const login = async () => {
  if (CLIENT_ID === '' || CLIENT_SECRET === '') {
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
  log(`If your browser doesn't open automatically, open this URL:`);
  log(`\n${chalk.underline(AUTH_URL)}\n`);

  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:',
    validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
  }]);

  return answer.token;
};
