import { resolve } from 'path';
import { homedir } from 'os';
import { writeFile, readFileSync } from 'fs';

import Joi from 'joi';

import { error } from './log';
import { settingsSchema } from './schema';

export const resolveConfigPath = () => {
  const fileName = `.programdevclirc.json`;
  const defaultPath = resolve(homedir(), fileName);

  if (!defaultPath) {
    error('Config file path failed to resolve');
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
    error(result.error.message);
    return false;
  }

  await writeFile(path, JSON.stringify(data), (err) => {
    if (err) throw err;
  });
  return true;
};

export const update = async (key, value) => {
  let config = load();
  if (!config) {
    error('Failed to retrieve existing config file');
    return false;
  }

  config[key] = value;
  return write(config);
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
    if (err) {
      return false;
    }
  });

  return true;
};