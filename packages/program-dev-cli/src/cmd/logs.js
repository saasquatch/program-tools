import chalk from 'chalk';
import moment from 'moment';

import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { getLogStream } from '../util/webtask';

export const command = 'logs';
export const desc = 'View the Webtask log stream';

/**
 * Streams the Webtask logs to the console
 */
export const handler = (argv) => {
  const context = getContext();

  if (!context.config) {
    log();
    error('You are not logged in.');
    return;
  }

  const stream = getLogStream(context.config);

  let pattern = undefined;

  if (argv.pattern) {
    pattern = new RegExp(argv.pattern, argv.flags);
    log();
    log(`Filtering logs with pattern '${pattern}'`);
    log();
  }

  log(`${chalk.green(`[${moment().format('LTS')}] Successfully connected to log stream`)}`);

  stream.on('data', (chunk) => {
    if (pattern && !pattern.test(chunk.msg)) {
      return;
    }

    const time = moment(chunk.time);
    log(`[${time.format('LTS')}] ${chunk.msg}`);
  });

  stream.on('end', () => {
    log('log stream ended');
  });

  stream.on('error', (err) => {
    log(chalk.red('An error ocurred while streaming logs:\n\n'));
    log(err);
  });
};

export const builder = {
  pattern: {
    type: 'string',
    describe: 'Regex pattern to filter the logs with'
  },
  flags: {
    type: 'string',
    describe: 'Regex flags',
    implies: 'pattern'
  }
};
