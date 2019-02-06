import { statSync } from 'fs';
import glob from 'glob';

export const isDir = (path) => {
  return statSync(path).isDirectory();
};

export const gherkins = (dir) => {
  return glob.sync(`${dir}/**/*.feature`);
};
