import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';

import { log } from '../util/log';
import { write as writeConfig, resolveConfigPath } from '../util/config';
import { load as loadConfig } from '../util/config';

export const command = 'login';
export const desc = 'Login to Contentful and Webtask';

const APP_ID = `DavxURak0VBfgHXGRfCRnsvDe1bziBMuLi72cbYm5b2DqwqxN5VtZApSIDmBFCAF`;
const REDIRECT_URI = `https://www.contentful.com/developers/cli-oauth-page/`;
const O_AUTH_URL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;
const CONTENTFUL_AUTH_URL = `https://google.ca`;
const WEBTASK_AUTH_URL = `https://google.ca`;

const login = async () => {
  const configPath = resolveConfigPath();
  const config = loadConfig();

  if (config && config.contentfulToken && config.webtaskToken) {
    log();
    log(`It looks like you already stored your tokens on your system. ${chalk.dim(`(Located at ${configPath})`)}`);
    log(`Your Contentful token: ${config.contentfulToken}`);
    log(`Your Webtask token: ${config.webtaskToken}`);
    log(`Maybe you want to logout?`);
    return;
  }

  log(`== Contentful authorization ==`);
  log();
  log(`A browser window will open where you will login to Contentful and authorize this CLI tool.`);
  log();

  const contentfulConfirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Open browser window now?',
    default: true
  }]);

  if (!contentfulConfirmed.ready) {
    log('Log in aborted by the user.');
    return;
  }

  // We open the browser window only on Windows and OSX since this might fail or open the wrong browser on Linux.
  if (['win32', 'darwin'].includes(process.platform)) {
    await opn(CONTENTFUL_AUTH_URL, {
      wait: false
    });
  } else {
    log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${CONTENTFUL_AUTH_URL}\n\n`);
  }

  const contentfulAnswer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:',
    validate: (val) => /^[a-z0-9]{64}$/.test(val.trim())
    // validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
  }]);

  log(contentfulAnswer.token);
  log(`Contentful authorization completed`);
  log();

  log(`== Webtask authorization ==`);
  log();
  log(`A browser window will open where you will login to Webtask and authorize this CLI tool.`);
  log();

  const webtaskConfirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Open browser window now?',
    default: true
  }]);

  if (!webtaskConfirmed.ready) {
    log('Log in aborted by the user.');
    return;
  }

  // We open the browser window only on Windows and OSX since this might fail or open the wrong browser on Linux.
  if (['win32', 'darwin'].includes(process.platform)) {
    await opn(WEBTASK_AUTH_URL, {
      wait: false
    });
  } else {
    log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${WEBTASK_AUTH_URL}\n\n`);
  }

  const webtaskAnswer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:'
    // validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
  }]);

  log(webtaskAnswer.token);

  // Store the contentful and webtask tokens here
  const success = await writeConfig({
    contentfulToken: contentfulAnswer.token,
    webtaskToken: webtaskAnswer.token
  });

  if (success) {
    log('Authentication complete');
  } else {
    log('Authentication step failed');
  }
};

export const handler = login;