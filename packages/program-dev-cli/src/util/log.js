import chalk from 'chalk';

export const log = (...args) => {
  console.log(...args);
};

export const info = (...args) => {
  console.log(chalk.blue('INFO'), ...args);
};

export const warn = (...args) => {
  console.log(chalk.yellow('WARN'), ...args);
};

export const error = (...args) => {
  console.log(chalk.red('ERROR'), ...args);
};