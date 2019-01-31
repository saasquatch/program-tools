import inquirer from 'inquirer';
import opn from 'opn';

import { log, error } from '../util/log';

const CLIENT_ID = process.env.PDCLI_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PDCLI_CLIENT_SECRET || '';
const REDIRECT_URI = `https://www.contentful.com/developers/cli-oauth-page/`;
const AUTH_URL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;

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
    // return null;
  }

  // We open the browser window only on Windows and OSX since this might fail or open the wrong browser on Linux.
  // if (['win32', 'darwin'].includes(process.platform)) {
  //   await opn(AUTH_URL, {
  //     wait: false
  //   });
  // } else {
  //   log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${AUTH_URL}\n\n`);
  // }

  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:',
    validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
  }]);

  return answer.token;
};