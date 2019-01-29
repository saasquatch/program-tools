import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';

export const command = 'login';
export const desc = 'Login to Contentful and Webtask';

const APP_ID = `DavxURak0VBfgHXGRfCRnsvDe1bziBMuLi72cbYm5b2DqwqxN5VtZApSIDmBFCAF`;
const REDIRECT_URI = `https://www.contentful.com/developers/cli-oauth-page/`;
// const O_AUTH_URL = `https://be.contentful.com/oauth/authorize?response_type=token&client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=content_management_manage`;
const CONTENTFUL_AUTH_URL = `https://google.ca`;
const WEBTASK_AUTH_URL = `https://google.ca`;

export async function login () {
  const cmaToken = null;

  if (cmaToken) {
    console.log();
    console.log(`Looks like you already stored a Contentful token on your system. ${chalk.dim(`(Located at here`)}`);
    console.log(`Your CMA token: ${cmaToken}`);
    console.log(`Maybe you want to logout?`);
    return cmaToken;
  }

  console.log(`== Contentful authorization ==`);
  console.log();
  console.log(`A browser window will open where you will login to Contentful and authorize this CLI tool.`);
  console.log();

  const contentfulConfirmed = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Open browser window now?',
      default: true
    }
  ]);

  if (!contentfulConfirmed.ready) {
    console.log('Log in aborted by the user.');
    return;
  }

  // We open the browser window only on Windows and OSX since this might fail or open the wrong browser on Linux.
  if (['win32', 'darwin'].includes(process.platform)) {
    await opn(CONTENTFUL_AUTH_URL, {
      wait: false
    });
  } else {
    console.log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${CONTENTFUL_AUTH_URL}\n\n`);
  }

  const tokenAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'cmaToken',
      message: 'Paste your token here:'
      // validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
    }
  ]);

  console.log(tokenAnswer.cmaToken);
  console.log(`Contentful authorization completed`);
  console.log();

  console.log(`== Webtask authorization ==`);
  console.log();
  console.log(`A browser window will open where you will login to Webtask and authorize this CLI tool.`);
  console.log();

  const webtaskConfirmed = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ready',
      message: 'Open browser window now?',
      default: true
    }
  ]);

  if (!webtaskConfirmed.ready) {
    console.log('Log in aborted by the user.');
    return;
  }

  // We open the browser window only on Windows and OSX since this might fail or open the wrong browser on Linux.
  if (['win32', 'darwin'].includes(process.platform)) {
    await opn(WEBTASK_AUTH_URL, {
      wait: false
    });
  } else {
    console.log(`Unable to open your browser automatically. Please open the following URI in your browser:\n\n${WEBTASK_AUTH_URL}\n\n`);
  }

  const webtaskAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'webtaskToken',
      message: 'Paste your token here:'
      // validate: (val) => /^[a-f0-9]{64}$/.test(val.trim())
    }
  ]);

  console.log(webtaskAnswer.webtaskToken);

  // Store the contentful and webtask tokens here

  console.log('Authentication complete');
  return;
}

login();