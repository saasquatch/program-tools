import { createClient } from 'contentful-management';

import { log } from '../util/log';
import { load as loadConfig } from '../util/config';

const deploy = async () => {
  const config = loadConfig();

  if (!config || !config.contentfulToken || !config.webtaskToken) {
    log();
    log('You are not logged in. Please login with the `login` command.');
    log();
    log('Exiting.');
    return;
  }

  log(config.contentfulToken);

  const client = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    // space: "1th1ybv0b2n4",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: config.contentfulToken
  });
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
  client.getSpace('1th1ybv0b2n4')
    .then(space => {
      space.getEnvironment('master')
        .then(env => {
          env.getEntry('NaEDz2HmmIiUq4YAacKqa')
            .then(entry => {
              log(entry.fields.schema['en-US']);
            });
        });
    });
};

export const handler = deploy;