import { resolve } from 'path';
import { homedir } from 'os';
import { writeFile, readFileSync } from 'fs';

import Joi from 'joi';

import { log, warn, error } from './log';
import { settingsSchema } from './schema';

export const resolveConfigPath = () => {
  const fileName = `.programdevclirc.json`;
  const defaultPath = resolve(homedir(), fileName);

  if (!defaultPath) {
    warn('Config file path failed to resolve');
  }

  return defaultPath;
};

export const write = async (data) => {
  const path = resolveConfigPath();
  if (!path) {
    error('Failed to write config file.');
    return false;
  }

  const result = Joi.validate(data, settingsSchema);
  if (result.error) {
    error('Settings schema validation failed');
    return false;
  }

  await writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
  return true;
};

export const load = () => {
  const path = resolveConfigPath();
  if (!path) {
    error('Failed to read config file.');
    return null;
  }

  const fileData = readFileSync(path, 'utf8');
  if (fileData) {
    return JSON.parse(fileData);
  } else {
    return null;
  }
};

export const clear = async () => {
  const path = resolveConfigPath();
  if (!path) {
    error('Failed to write config file.');
    return false;
  }

  const data = {
    contentfulToken: null,
    webtaskToken: null
  };

  await writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  });

  return true;
};