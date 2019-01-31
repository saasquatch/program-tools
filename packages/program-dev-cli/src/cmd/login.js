import inquirer from 'inquirer';
import opn from 'opn';
import chalk from 'chalk';

import { log, error } from '../util/log';
import { write as writeConfig, resolveConfigPath } from '../util/config';
import { load as loadConfig } from '../util/config';

import { login as contentfulLogin } from '../auth/contentful';
import { login as webtaskLogin } from '../auth/webtask';

export const command = 'login';
export const desc = 'Login to Contentful and Webtask';

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

  log();
  log(`== Contentful authorization ==`);
  log();
  log(`A browser window will open where you will login to Contentful and authorize this CLI tool.`);
  log();

  const contentfulToken = await contentfulLogin();
  if (!contentfulToken) {
    return;
  }

  log(`Contentful authorization completed`);
  log();

  log();
  log(`== Webtask authorization ==`);
  log();
  log(`A browser window will open where you will login to Webtask and authorize this CLI tool.`);
  log();

  const webtaskToken = await webtaskLogin();
  if (!webtaskToken) {
    return;
  }

  const success = await writeConfig({
    contentfulToken: contentfulToken,
    webtaskToken: webtaskToken
  });

  if (success) {
    log('Authentication complete');
  } else {
    error('Failed to write tokens to config file');
  }
};

export const handler = login;