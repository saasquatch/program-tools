import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';
import url from 'url';
import crypto from 'crypto';

import { log, error } from '../util/log';
import { base64URLEncode } from '../util/crypto';

const CLIENT_ID = process.env.PDCLI_AUTH0_CLIENT_ID || '';
const REDIRECT_URI = `http://127.0.0.1:8722`;
const LOGIN_URL = `https://squatch.auth0.com`;

/**
 * Builds the Auth0 authentication URL based on
 * the program requirements
 *
 * @return {String} The Auth0 URL
 */
const getAuthURL = () => {
  let loginUrl = url.parse(LOGIN_URL, true);
  let codeVerifier = base64URLEncode(crypto.randomBytes(16));
  let codeChallange = base64URLEncode(crypto.createHash('sha256')
                                            .update(codeVerifier)
                                            .digest());

  loginUrl.pathname = '/authorize';
  loginUrl.query = {
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: 'openid email user_metadata app_metadata',
    code_challenge: codeChallange,
    code_challenge_method: 'S256'
  };

  return url.format(loginUrl);
};

/**
 * Gets the Auth0 token from the user
 *
 * @return {String} The Auth0 token
 */
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

  const authURL = getAuthURL();
  await opn(authURL, {
    wait: false
  });

  log();
  log(`If your browser doesn't open automatically, open this URL:`);
  log(`\n${chalk.underline(authURL)}\n`);

  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'token',
    message: 'Paste your token here:'
  }]);

  return answer.token;
};