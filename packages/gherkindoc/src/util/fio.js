import { statSync } from 'fs';
import glob from 'glob';
import moment from 'moment';

export const isDir = (path) => {
  return statSync(path).isDirectory();
};

export const gherkins = (dir) => {
  return glob.sync(`${dir}/**/*.feature`);
};

export const getOutputFileName = (input) => {
  const defaultFileName = `gherkindoc-${moment().format('YYYY-MM-DD:HH-MM-SS')}`;
  if (!input) {
    return defaultFileName;
  }

  if (isDir(input)) {
    return `${input}/${defaultFileName}`;
  } else {
    return input;
  }
};
