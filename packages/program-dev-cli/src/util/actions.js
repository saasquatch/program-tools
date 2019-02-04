import inquirer from 'inquirer';

import { bigWarn } from './log';

/**
 * Puts up a huge warning dialog for the user to confirm
 *
 * @param {String} warnMessage The message to warn with
 * @param {String} confirmMessage The confirmation question/message
 *
 * @return {Boolean} Whether the user confirmed or not
 */
export const hugeWarningConfirm = async (warnMessage, confirmMessage) => {
  bigWarn(warnMessage);
  const confirmed = await inquirer.prompt([{
    type: 'confirm',
    name: 'yes',
    message: confirmMessage,
    default: true
  }]);
  return confirmed.yes;
};
