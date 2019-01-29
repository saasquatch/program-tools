import { resolve } from 'path';
import { homedir } from 'os';
import { writeFile } from 'fs';

import Joi from 'joi';

import log from './log';
import { settingsSchema } from './schema';

const resolveHomeDir = () => {
  const fileName = `.programdevclirc.json`;
  const defaultPath = resolve(homedir(), fileName);

  if (!defaultPath) {
    log.warn('Config file path failed to resolve');
  }

  return defaultPath;
};

export const write = async (data) => {
  const path = resolveHomeDir();
  if (!path) {
    log.error('Failed to write config file.');
    return;
  }

  const result = Joi.validate(data, settingsSchema);
  if (result.error) {
    log.error('Settings schema validation failed');
    return;
  }

  await writeFile(path, JSON.stringify(data));
};