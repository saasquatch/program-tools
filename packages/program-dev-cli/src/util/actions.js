import inquirer from 'inquirer';

import { bigWarn } from './log';

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