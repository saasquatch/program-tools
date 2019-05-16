import { statSync } from 'fs';
import { dirname } from 'path';
import glob from 'glob';
import moment from 'moment';

export const isDir = (path: string) => {
  return statSync(path).isDirectory();
};

export const gherkins = (dir: string) => {
  return glob.sync(`${dir}/**/*.feature`);
};

export const getOutputFileName = (input: string) => {
  const defaultFileName = `gherkindoc--${moment().format('YYYY-MM-DD--HH-mm-ss')}.xlsx`;
  if (!input) {
    return defaultFileName;
  }

  if (isDir(input)) {
    return `${input}/${defaultFileName}`;
  } else {
    return input;
  }
};

export const getAllPaths = (file: string) => {
  return dirname(file).split('/');
};
