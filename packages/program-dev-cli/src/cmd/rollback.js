import chalk from 'chalk';

import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { hugeWarningConfirm } from '../util/actions';
import { uploadSchema } from '../util/contentful';
import { uploadWebtask } from '../util/webtask';

export const command = 'rollback';
export const desc = 'Rollback to a previous deploy';

/**
 * Basic checks to complete before the command begins
 * executing
 *
 * @param {Object} config The program config
 *
 * @return {String | null} The error as a string, null if no error
 */
const preflightCheck = (config) => {
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

  if (!config.lastDeploy) {
    log();
    error('No previous deploy found');
    log();
    log('Exiting.');
    return;
  }

  const lastDeploy = config.lastDeploy;

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
    await uploadWebtask(lastDeploy.source, config)
      .catch(err => {
        log();
        error(err.message);
      });

    if (!argv.codeOnly) {
      log();
    }
  }

  if (!argv.codeOnly) {
    await uploadSchema(lastDeploy.schema, config)
      .catch(err => {
        log();
        error(err.message);
      });
  }
};

export const builder = {
  codeOnly: {
    alias: 'c',
    type: 'boolean',
    describe: 'Only deploy the code'
  },
  schemaOnly: {
    alias: 's',
    type: 'boolean',
    describe: 'Only deploy the schema'
  }
};
