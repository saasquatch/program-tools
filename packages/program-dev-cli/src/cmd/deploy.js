import { log, error } from '../util/log';
import { getContext } from '../util/context';
import { hugeWarningConfirm } from '../util/actions';
import { uploadSchema } from '../util/contentful';

const commandPreflightCheck = (args, config) => {
  if (args.length !== 1) {
    return 'Incorrect number of arguments provided';
  }
  if (!config) {
    return 'You are not logged in.';
  }
  if (!config.contentfulToken || !config.webtaskToken) {
    return 'One or more authentication tokens are missing.';
  }
  if (!config.space) {
    return 'Contentful space is not configured. Use `program-dev-cli space` to set up';
  }
  return null;
};

const deploy = async (argv) => {
  argv._.shift();
  const args = argv._;
  const context = getContext();
  const config = context.config;

  const preflightCheck = commandPreflightCheck(args, config);
  if (preflightCheck !== null) {
    log();
    error(preflightCheck);
    log();
    log('Exiting.');
    return;
  }


  if (config.space.live === true) {
    const confirmed = await hugeWarningConfirm(
      `Your space is set to '${config.space.name}'. Are you sure you want to deploy?`,
      `Yes, I really want to deploy to '${config.space.name}'.`
    );

    if (!confirmed) {
      log('Exiting.');
      return;
    }
  }

  uploadSchema(args, config);
};

export const handler = deploy;