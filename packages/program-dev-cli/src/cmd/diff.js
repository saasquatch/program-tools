import * as jsdiff from 'diff';
import chalk from 'chalk';
import termSize from 'term-size';
import diff from 'deep-diff';
import ora from 'ora';
import { readFileSync } from 'fs';

import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { getSchema } from '../util/contentful';
import { getWebtask } from '../util/webtask';
import { findFilePair, fileExists } from '../util/fio';

export const command = 'diff';
export const desc = 'Take a diff between a local and remote program';

const PRE_CHANGE_BUFFER_SIZE = 3;

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
  if (args.length < 1) {
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

  if (argv.production) {
    log('Temporarily setting space to PRODUCTION');
    log('The diff operation will NOT modify anything on Contentful/Webtask');
    log();

    config.space = config.availableSpaces.find(s => s.live === true);
  }

  if (!argv.schemaOnly) {
    const webtaskSpinner = ora('Pulling Webtask code diff...').start();
    let webtask = await getWebtask(filePair.source, config);

    if (!webtask) {
      webtaskSpinner.fail('Failed to retrieve webtask');
      return;
    }

    let code;
    try {
      code = readFileSync(filePair.source, 'utf8');
    } catch (err) {
      webtaskSpinner.fail(err);
      return;
    }

    code = code.replace(/\r\n/g, '\n').trim();
    webtask.code = webtask.code.replace(/\r\n/g, '\n').trim();

    const changes = jsdiff.diffLines(webtask.code, code);
    if (changes.length > 1) {
      webtaskSpinner.info('Changes to code detected:');
      let linesPrinted = PRE_CHANGE_BUFFER_SIZE;
      let preChangeBuffer = [];
      let currentLine = 0;

      changes.forEach(change => {
        const lines = change.value.split(/\n/);
        const color = change.added ? chalk.green : change.removed ? chalk.red : chalk.white;

        if (lines.length > 1) {
          lines.pop();
        }

        if (change.added || change.removed) {
          linesPrinted = 0;

          if (preChangeBuffer.length > 0) {
            log();
            log(chalk.bold('─'.repeat(termSize().columns)));
            log(`${chalk.bold(`modified: ${filePair.source}`)} ${chalk.blue.bold(`line ${currentLine + 1}`)}`);
            log(chalk.bold('─'.repeat(termSize().columns)));
          }

          while (preChangeBuffer.length > 0) {
            console.log(preChangeBuffer.shift());
          }

          lines.forEach(line => {
            console.log(color(line));
          });

        } else {
          lines.forEach(line => {
            if (linesPrinted++ < PRE_CHANGE_BUFFER_SIZE) {
              console.log(line);
            } else {
              preChangeBuffer.push(line);

              if (preChangeBuffer.length > PRE_CHANGE_BUFFER_SIZE) {
                preChangeBuffer.shift();
              }
            }

            currentLine++;
          });
        }
      });
    } else {
      webtaskSpinner.succeed('No changes to code');

      if (!argv.codeOnly) {
        log();
      }
    }
  }

  if (!argv.codeOnly) {
    const contentfulSpinner = ora('Pulling Contentful schema diff...').start();
    const remoteSchema = await getSchema(filePair.schema, config);

    if (!remoteSchema) {
      contentfulSpinner.fail('Failed to retrieve remote schema');
      return;
    }

    let localSchema;
    try {
      localSchema = readFileSync(filePair.schema, 'utf8');
    } catch (err) {
      contentfulSpinner.fail(err);
      return;
    }

    const changes = diff(remoteSchema, JSON.parse(localSchema));

    if (changes) {
      contentfulSpinner.info('Changes to schema detected:');
      log();
      changes.forEach(change => {
        const path = change.path.toString().replace(/,/g, '/');
        switch (change.kind) {
          case 'D':
            log('[deletion]:');
            log(`  path: ${path}`);
            log(`  remote: ${chalk.green(change.lhs || '')}`);
            break;
          case 'N':
            log('[addition]:');
            log(`  path: ${path}`);
            log(`  local:  ${chalk.green(change.rhs || '')}`);
            break;
          case 'E':
            log('[edit]:');
            log(`  path: ${path}`);
            log(`  remote: ${chalk.red(change.lhs || '')}`);
            log(`  local:  ${chalk.green(change.rhs || '')}`);
            break;
          case 'A':
            log('[array edit]:');
            log(`  path: ${path}`);
            log(`  remote: ${chalk.red(change.lhs || '')}`);
            log(`  local:  ${chalk.green(change.rhs || '')}`);
            break;
        }

        log();
      });
    } else {
      contentfulSpinner.succeed('No changes to schema');
    }
  }
};

export const builder = {
  production: {
    alias: 'p',
    type: 'boolean',
    describe: 'Use the production Webtask/Contentful code for the diff instead'
  },
  codeOnly: {
    alias: 'c',
    type: 'boolean',
    describe: 'Only run the diff on the code'
  },
  schemaOnly: {
    alias: 's',
    type: 'boolean',
    describe: 'Only run the diff on the schema'
  }
};
