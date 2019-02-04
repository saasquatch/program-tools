import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';

import { log } from '../util/log';

const LOGIN_URL = `https://pink-credit.surge.sh`;

/**
 * Gets the Auth0 token from the user
 *
 * @return {String} The Auth0 token
 */
export const login = async () => {
  const confirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Open browser window now?',
    default: true
  }]);

  if (!confirmed.ready) {
    log('Log in aborted by the user.');
    return undefined;
  }

  log();
  log('Login and use the "Token Viewer" tab to get your webtask token.');

  await opn(LOGIN_URL, {
    wait: false
  });

  log();
  log(`If your browser doesn't open automatically, open this URL:`);
  log(`\n${chalk.underline(LOGIN_URL)}\n`);

  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:'
  }]);

  return answer.token;
};
