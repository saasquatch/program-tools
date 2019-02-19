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

  const logTags = [
    {re: /\[error\]/i, color: chalk.red},
    {re: /\[warn\]/i, color: chalk.yellow},
    {re: /\[info\]/i, color: chalk.blue},
    {re: /\[debug\]/i, color: chalk.green}
  ];

  const multiLineBugRe = /\r?\n+(?=\[)/gmi;

  stream.on('data', (chunk) => {
    const time = moment(chunk.time);

    chunk.msg.split(multiLineBugRe).forEach(line => {
      let timeColor = chalk.white;
      let msgColor = chalk.white;

      if (pattern) {
        if (pattern.test(line)) {
          if (argv.highlight) {
            msgColor = chalk.magenta;
          }
        } else if (!argv.highlight) {
          return;
        }
      }

      for (let i = 0; i < logTags.length; i++) {
        if (logTags[i].re.test(line)) {
          timeColor = logTags[i].color;
          break;
        }
      }

      log(`${timeColor(`[${time.format('LTS')}]`)} ${msgColor(line)}`);
    });
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
    alias: 'p',
    type: 'string',
    describe: 'Regex pattern to filter the logs with'
  },
  highlight: {
    alias: 'hi',
    type: 'boolean',
    describe: 'Highlight messages matching the pattern instead of filtering them',
    implies: 'pattern'
  },
  flags: {
    alias: 'f',
    type: 'string',
    describe: 'Regex flags',
    implies: 'pattern'
  }
};
