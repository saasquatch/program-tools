import Joi from 'joi';
import { resolve } from 'path';
import { homedir } from 'os';
import { writeFileSync, readFileSync } from 'fs';
import { fileExists } from './fio.js';

import { error } from './log';
import { settingsSchema } from './schema';

/**
 * Finds the location of the config file
 *
 * @return {String} The path
 */
export const resolveConfigPath = () => {
  const fileName = `.programdevclirc.json`;
  const defaultPath = resolve(homedir(), fileName);

  if (!defaultPath) {
    error('Config file path failed to resolve');
  }

  return defaultPath;
};

/**
 * Writes the config to the config file
 *
 * @param {Object} data The config
 * @return {Boolean} Whether the operation succeeded
 */
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

  writeFileSync(path, JSON.stringify(data));
  return true;
};

/**
 * Updates the config file with new information
 *
 * @param {String} key The key to update
 * @param {Any} value The value to write
 *
 * @return {Boolean} Whether the operation succeeded
 */
export const update = async (key, value) => {
  let config = load();
  if (!config) {
    error('Failed to retrieve existing config file');
    return false;
  }

  config[key] = value;
  return await write(config);
};

/**
 * Loads the config file
 *
 * @return {Object | null} The config object if sucessful, null otherwise
 */
export const load = () => {
  const path = resolveConfigPath();
  if (!path) {
    error('Failed to read config file.');
    return null;
  }

  if (!fileExists(path)) {
    return null;
  }

  const fileData = readFileSync(path, 'utf8');
  if (fileData) {
    return JSON.parse(fileData);
  } else {
    error('No file data read');
    return null;
  }
};

/**
 * Clears all information in the config file
 *
 * @return {Boolean} Whether the operation succeeded
 */
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

  writeFileSync(path, JSON.stringify(data));
  return true;
};
