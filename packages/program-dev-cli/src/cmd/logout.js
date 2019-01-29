import inquirer from 'inquirer';

import { log } from '../util/log';
import { load as loadConfig } from '../util/config';
import { clear as clearConfig } from '../util/config';

export const command = 'logout';
export const desc = 'Remove Contentful and Webtask credentials';

const logout = async () => {
  const config = loadConfig();

  if (!config) {
    log();
    log('It looks like you are already logged out (no config file was found).');
    log('Maybe you want to login?');
    return;
  }

  if (!config.webtaskToken && !config.contentfulToken) {
    log();
    log('It looks like you are already logged out (no tokens found in config file).');
    log('Maybe you want to login?');
    return;
  }

  log('Warning: Logging out will delete the Contentful and Webtask access tokens');
  log('from your system.');

  const logoutConfirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Are you sure you want to log out?',
    default: true
  }]);

  if (!logoutConfirmed.ready) {
    log('Logout aborted.');
    return;
  }

  const success = await clearConfig();

  if (success) {
    log('Successfully logged out.');
  } else {
    log('An error occurred while logging out.');
  }
};

export const handler = logout;