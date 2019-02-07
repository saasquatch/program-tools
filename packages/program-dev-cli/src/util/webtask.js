import sandbox from 'sandboxjs';
import path from 'path';
import ora from 'ora';
import { readFileSync } from 'fs';

import { error } from '../util/log';

const CONTAINER = 'saasquatch';
const WEBTASK_URL = 'https://saasquatch.auth0-extend.com';

/**
 * Uploads the provided Webtask code
 *
 * @param {String} source Path to source code
 * @param {Object} config cli config
 */
export const uploadWebtask = async (source, config) => {
  const prefix = config.space.live
    ? ''
    : 'staging-';

  const webtaskName = `${prefix}${path.basename(source, '.js')}`;
  const connectionSpinner = ora('Connecting to webtask').start();

  const profile = sandbox.init({
    url: WEBTASK_URL,
    container: CONTAINER,
    token: config.webtaskToken
  });

  const webtask = await profile.getWebtask({
    name: webtaskName,
    fetch_code: true
  })
    .catch((err) => {
      if (err.statusCode === 404) {
        return undefined;
      } else {
        const errMessage = `Failed to connect to webtask: ${err.message}\n\nCode:${err.statusCode}`;
        connectionSpinner.fail(errMessage);
        return null;
      }
    });

  if (webtask === null) {
    return;
  }

  connectionSpinner.succeed('Connected');
  const readSpinner = ora('Reading source code file...').start();

  let code;
  try {
    code = readFileSync(source, 'utf8');
  } catch (err) {
    const errMessage = `Failed to read source code file`;
    readSpinner.fail(errMessage);
    return;
  }

  if (webtask && webtask.code === code) {
    readSpinner.succeed('Webtask code was unchanged');
    return;
  }

  readSpinner.succeed('Source code loaded');
  const uploadSpinner = ora();

  if (webtask) {
    uploadSpinner.start(`Updating existing webtask: '${webtaskName}'`);

    await profile.updateWebtask({
      name: webtaskName,
      code: code
    })
      .then(() => {
        uploadSpinner.succeed(`Updated webtask '${webtaskName}'`);
      })
      .catch(err => {
        const errMessage = `Error ocurred while updating webtask: ${err.message}`;
        uploadSpinner.fail(errMessage);
      });

  } else {
    uploadSpinner.start(`Creating new webtask: '${webtaskName}'`);

    await profile.create(code, {
      name: webtaskName
    })
      .then(() => {
        uploadSpinner.succeed(`Created new webtask '${webtaskName}'`);
      })
      .catch(err => {
        const errMessage = `Error ocurred while creating webtask: ${err.message}`;
        uploadSpinner.fail(errMessage);
      });
  }
};

/**
 * Gets a webtask
 *
 * @param {String} source Path to source code
 * @param {Object} config cli config
 *
 * @return {Object} The webtask
 */
export const getWebtask = async (source, config) => {
  const prefix = config.space.live
    ? ''
    : 'staging-';

  const webtaskName = `${prefix}${path.basename(source, '.js')}`;

  const profile = sandbox.init({
    url: WEBTASK_URL,
    container: CONTAINER,
    token: config.webtaskToken
  });

  const webtask = await profile.getWebtask({
    name: webtaskName,
    fetch_code: true
  })
    .catch((err) => {
      if (err.statusCode === 404) {
        return undefined;
      } else {
        error(`Failed to connect to webtask: ${err.message}\n\nCode:${err.statusCode}`);
        return null;
      }
    });

  return webtask;
};

/**
 * Returns the Webtask log stream
 * @param {Object} config The program config
 */
export const getLogStream = (config) => {
  const profile = sandbox.init({
    url: WEBTASK_URL,
    container: CONTAINER,
    token: config.webtaskToken
  });

  return profile.createLogStream();
};
