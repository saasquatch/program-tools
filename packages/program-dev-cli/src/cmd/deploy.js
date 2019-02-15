import chalk from 'chalk';

import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { hugeWarningConfirm } from '../util/actions';
import { uploadSchema } from '../util/contentful';
import { uploadWebtask } from '../util/webtask';
import { findFilePair, fileExists } from '../util/fio';

export const command = 'deploy';
export const desc = 'Deploy a program to Webtask/Contentful';

/**
 * Basic checks to complete before the command begins
 * executing
 *
 * @param {String[]} args List of command arguments
 * @param {Object} config The program config
 *
 * @return {String | null} The error as a string, null if no error
 */
const preflightCheck = (args, config) => {
  if (args.length !== 1) {
    return 'Incorrect number of arguments provided';
  }
  if (!fileExists(args[0])) {
    return 'File provided does not exist';
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

/**
 * Deploy command. Finds the appropriate files
 * and uploads them to Webtask/Contentful if
 * they need updating
 *
 * @param {Object} argv Command args from Yargs
 */
export const handler = async (argv) => {
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

  if (!argv.schemaOnly) {
    await uploadWebtask(filePair.source, config)
      .catch(err => {
        log();
        error(err.message);
      });

    if (!argv.codeOnly) {
      log();
    }
  }

  if (!argv.codeOnly) {
    await uploadSchema(filePair.schema, config)
      .catch(err => {
        log();
        error(err.message);
      });
  }
};

export const builder = {
  codeOnly: {
    type: 'boolean',
    describe: 'Only deploy the code'
  },
  schemaOnly: {
    type: 'boolean',
    describe: 'Only deploy the schema'
  }
};
