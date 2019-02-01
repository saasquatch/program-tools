import chalk from 'chalk';

import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { hugeWarningConfirm } from '../util/actions';
import { uploadSchema } from '../util/contentful';
import { uploadWebtask } from '../util/webtask';
import { findFilePair } from '../util/fio';

const preflightCheck = (args, config) => {
  if (args.length !== 1) {
    return 'Incorrect number of arguments provided';
  }
  if (!config) {
    return 'You are not logged in.';
  }
  if (!config.contentfulToken || !config.webtaskToken) {
    return 'One or more authentication tokens are missing.';
  }
  if (!config.space) {
    return 'Contentful space is not configured. Use `program-dev-cli space` to set up';
  }
  return null;
};

const deploy = async (argv) => {
  argv._.shift();
  const args = argv._;
  const context = getContext();
  const config = context.config;

  const checkResult = preflightCheck(args, config);
  if (checkResult !== null) {
    log();
    error(checkResult);
    log();
    log('Exiting.');
    return;
  }

  const filePair = await findFilePair(args[0]);
  if (!filePair) {
    log();
    error('Could not find schema file to accompany source');
    error('Make sure you pass a webtask Javascript file and that');
    error('your files are in the form <programName>.js, <programName>_schema.json');
    log();
    log('Exiting.');
    return;
  }

  if (config.space.live === true) {
    const confirmed = await hugeWarningConfirm(
      `You are about to deploy to the ${chalk.bold('LIVE')} Contentful and Webtask environments.`,
      `Yes, I really want to deploy to the ${chalk.bold('LIVE')} environments.`
    );

    if (!confirmed) {
      log('Exiting.');
      return;
    }
  }

  await uploadWebtask(filePair, config);
  return;


  uploadSchema(filePair, config);
};

export const handler = deploy;