/********************************************************/
/*                          API                         */
/********************************************************/
export type TriggerType =
  | 'AFTER_USER_CREATED_OR_UPDATED'
  | 'AFTER_USER_EVENT_PROCESSED'
  | 'REFERRAL'
  | 'PROGRAM_INTROSPECTION'
  | 'SCHEDULED'
  | 'REWARD_SCHEDULED'
  | 'PROGRAM_VALIDATION';

export type Program = {
  AFTER_USER_CREATED_OR_UPDATED?: ProgramTriggerHandler;
  AFTER_USER_EVENT_PROCESSED?: ProgramTriggerHandler;
  REFERRAL?: ProgramTriggerHandler;
  PROGRAM_INTROSPECTION?: ProgramIntospectionHandler;
  SCHEDULED?: ProgramTriggerHandler;
  REWARD_SCHEDULED?: ProgramTriggerHandler;
  PROGRAM_VALIDATION?: ProgramValidationFunctions;
};

/********************************************************/
/*                     Request Body                     */
/********************************************************/
export type RequestBody = {
  messageType:
    | 'PROGRAM_TRIGGER'
    | 'PROGRAM_INTROSPECTION'
    | 'PROGRAM_VALIDATION';
};

export type ProgramTriggerBody = RequestBody & {
  activeTrigger: any;
  program: any;
  ids: string[];
};

export type ProgramIntospectionBody = RequestBody & {
  template: any;
  rules: any;
  program: any;
};

type ValidationRequest = {
  key: string;
  queryResult: any;
};

export type ProgramValidationBody = RequestBody & {
  validationRequests: ValidationRequest[];
};

import Transaction from '../transaction';

/********************************************************/
/*                       Handlers                       */
/********************************************************/
export type ProgramTriggerHandler = (transaction: Transaction) => void;

export type ProgramIntospectionHandler = (
  template: any,
  rules: any,
  program?: any,
) => any;

export type PrerequisiteHandler = (
  queryResult: any,
) => PrereqValidationResult[];

type ProgramValidationFunctions = {
  [key: string]: PrerequisiteHandler;
};

/********************************************************/
/*                        Results                       */
/********************************************************/

/**
 * The result of a program being triggered
 */
export type ProgramTriggerResult = {
  json: any;
  code: number;
};

export type PrereqValidationResult = {
  message: string;
  status: 'ERROR' | 'WARN' | 'SUCCESS';
};

export type ValidationResult = {
  key: string;
  results: PrereqValidationResult[];
};

/********************************************************/
/*                         Misc                         */
/********************************************************/
export type ProgramPrerequisite = {
  key: string;
  name: string;
  description: string;
  query: string;
  queryVariables: {
    [key: string]: any;
  };
};
