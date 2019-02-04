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
const logs = () => {
  const context = getContext();

  const stream = getLogStream(context.config);

  log(`${chalk.green(`[${moment().format('LTS')}] Successfully connected to log stream`)}`);

  stream.on('data', (chunk) => {
    const time = moment(chunk.time);
    log(`[${time.format('LTS')}] ${chunk.msg}`);
  });

  stream.on('end', () => {
    log('log stream ended');
  });
};

export const handler = logs;
