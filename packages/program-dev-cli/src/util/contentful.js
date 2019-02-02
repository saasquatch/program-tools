import inquirer from 'inquirer';
import ora from 'ora';
import diff from 'deep-diff';
import { createClient } from 'contentful-management';
import { readFileSync } from 'fs';

import { hugeWarningConfirm } from '../util/actions';

/**
 * Uploads the provided schema to Contentful
 *
 * @param {Object} schema The program schema
 * @param {Object} config The cli config
 */
export const uploadSchema = async (schema, config) => {
  const connectionSpinner = ora('Connecting to contentful').start();
  const client = createClient({
    accessToken: config.contentfulToken
  });

  const env = await client.getSpace(config.space.id)
    .then(space => {
      return space.getEnvironment('master');
    });

  connectionSpinner.succeed('Connected');
  const entryFindSpinner = ora('Finding entry ID...').start();

  let data;
  try {
    data = readFileSync(schema, 'utf8');
  } catch (err) {
    const errMessage = `Failed to read schema file: ${err.message}`;
    entryFindSpinner.fail(errMessage);
    return;
  }

  let newSchema;
  try {
    newSchema = JSON.parse(data);
  } catch (err) {
    const errMessage = `Failed to parse provided schema file: ${err.message}`;
    entryFindSpinner.fail(errMessage);
    return;
  }

  let entryId = await env.getEntries({ 'content_type': 'programTemplate' })
    .then(entries => {
      for (let prop in entries.items) {
        if (entries.items.hasOwnProperty(prop)) {
          let tmpSchema = entries.items[prop].fields.schema['en-US'];
          if (tmpSchema.name === newSchema.name
            && tmpSchema.summary === newSchema.summary
            && tmpSchema.longDescription === newSchema.longDescription) {
            return entries.items[prop].sys.id;
          }
        }
      }
    })
    .catch(() => {
      return null;
    });

  if (!entryId) {
    entryFindSpinner.warn('Unable to automatically determine entry ID');
    const answer = await inquirer.prompt([{
      type: 'input',
      name: 'entryId',
      message: 'Please paste the entry ID:'
    }]);

    entryId = answer.entryId;
  } else {
    entryFindSpinner.succeed('Entry ID found');
  }

  if (config.space.live === true) {
    const confirmed = await hugeWarningConfirm(
      `You are deploying to '${config.space.name}'. Please confirm the entry ID: ${entryId}`,
      `Yes, this is the correct entry ID.`
    );

    if (!confirmed) {
      const answer = await inquirer.prompt([{
        type: 'input',
        name: 'entryId',
        message: 'Please paste the entry ID:'
      }]);

      entryId = answer.entryId;
    }
  }

  const uploadSpinner = ora('Uploading...').start();

  await env.getEntry(entryId)
    .then(entry => {
      const changed = diff(entry.fields.schema['en-US'], newSchema);
      if (!changed) {
        return new Promise(resolve => resolve(entry));
      }

      entry.fields.schema['en-US'] = newSchema;
      return entry.update();
    })
    .then(entry => {
      if (entry.isUpdated()) {
        uploadSpinner.text = 'Publishing...';
        entry.publish().then(() => {
          uploadSpinner.succeed('New version of schema published.');
        });
      } else {
        uploadSpinner.succeed('Contentful schema was unchanged');
      }
    })
    .catch(err => {
      const errMessage = `Failed to upload schema: ${err.message}`;
      uploadSpinner.fail(errMessage);
      return;
    });
};