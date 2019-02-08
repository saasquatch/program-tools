import chalk from 'chalk';
import moment from 'moment';

import { log } from '../util/log';
import { getContext } from '../util/context';
import { getLogStream } from '../util/webtask';

export const command = 'logs';
export const desc = 'View the Webtask log stream';

/**
 * Streams the Webtask logs to the console
 */
const logs = (argv) => {
  const context = getContext();
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
};

export const handler = logs;
