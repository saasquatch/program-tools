import sandbox from 'sandboxjs';
import path from 'path';
import ora from 'ora';
import { readFile } from 'fs';

const CONTAINER = 'saasquatch';
const WEBTASK_URL = 'https://saasquatch.auth0-extend.com';

/**
 * Uploads the provided Webtask code
 *
 * @param {String} source Path to source code
 * @param {Object} config cli config
 *
 * @return {Promise}
 */
export const uploadWebtask = (source, config) => {
  return new Promise(async (resolve, reject) => {
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
          reject(new Error(errMessage));
          return null;
        }
      });

    if (webtask === null) {
      return;
    }

    connectionSpinner.succeed('Connected');
    const readSpinner = ora('Reading source code file...').start();

    await readFile(source, 'utf8', async (err, code) => {
      if (err) {
        const errMessage = `Failed to read source code file: ${err.message}`;
        readSpinner.fail(errMessage);
        reject(new Error(errMessage));
        return;
      }

      if (webtask && webtask.code === code) {
        readSpinner.succeed('Webtask code was unchanged');
        resolve();
        return;
      }

      readSpinner.succeed('Source code loaded');
      const uploadSpinner = ora();

      if (webtask) {
        uploadSpinner.start(`Updating existing webtask: '${webtaskName}'`);

        profile.updateWebtask({
          name: webtaskName,
          code: code
        })
          .then(() => {
            uploadSpinner.succeed(`Updated webtask '${webtaskName}'`);
            resolve();
          })
          .catch(err => {
            const errMessage = `Error ocurred while updating webtask: ${err.message}`;
            uploadSpinner.fail(errMessage);
            reject(new Error(errMessage));
          });

      } else {
        uploadSpinner.start(`Creating new webtask: '${webtaskName}'`);

        profile.create(code, {
          name: webtaskName
        })
          .then(() => {
            uploadSpinner.succeed(`Created new webtask '${webtaskName}'`);
            resolve();
          })
          .catch(err => {
            const errMessage = `Error ocurred while creating webtask: ${err.message}`;
            uploadSpinner.fail(errMessage);
            reject(new Error(errMessage));
          });
      }
    });
  });
};