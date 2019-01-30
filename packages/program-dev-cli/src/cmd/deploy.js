import inquirer from 'inquirer';
import ora from 'ora';

import { createClient } from 'contentful-management';
import { readFile } from 'fs';

import { log, warn, error, bigWarn } from '../util/log';
import { getContext } from '../util/context';

const commandPreflightCheck = (args, config) => {
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

const hugeWarningConfirm = async (warnMessage, confirmMessage) => {
  bigWarn(warnMessage);
  const deployConfirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmed',
    message: confirmMessage,
    default: true
  }]);
  return deployConfirmed.confirmed;
};

const deploy = async (argv) => {
  argv._.shift();
  const args = argv._;
  const context = getContext();
  const config = context.config;

  const preflightCheck = commandPreflightCheck(args, config);
  if (preflightCheck !== null) {
    log();
    error(preflightCheck);
    log();
    log('Exiting.');
    return;
  }

  if (config.space.live === true) {
    const confirmed = await hugeWarningConfirm(
      `Your space is set to '${config.space.name}'. Are you sure you want to deploy?`,
      `Yes, I really want to deploy to '${config.space.name}'.`
    );

    if (!confirmed) {
      log('Exiting.');
      return;
    }
  }

  const connectionSpinner = ora('Connecting to contentful').start();
  const client = createClient({
    accessToken: config.contentfulToken
  });

  connectionSpinner.succeed('Connected');
  const uploadSpinner = ora('Uploading...').start();

  const env = await client.getSpace(config.space.id)
    .then(space => {
      return space.getEnvironment('master');
    });

  readFile(args[0], 'utf8', (err, data) => {
    if (err) {
      uploadSpinner.fail('Failed to read schema file: ' + err.message);
      return;
    }

    const newSchema = JSON.parse(data);

    env.getEntry('NaEDz2HmmIiUq4YAacKqa')
      .then(entry => {
        entry.fields.schema['en-US'] = newSchema;
        return entry.update();
      })
      .then(entry => {
        if (entry.isUpdated()) {
          uploadSpinner.text = 'Publishing...';
          entry.publish().then(() => {
            uploadSpinner.succeed('Done, new version of schema published.');
          });
        } else {
          uploadSpinner.succeed('Done, no updates were made to schema.');
        }
      })
      .catch(err => {
        uploadSpinner.fail('Failed to upload schema: ' + err.message);
        return;
      });
  });

};

export const handler = deploy;