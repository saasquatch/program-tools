import {types} from '@saasquatch/program-boilerplate';
import * as faker from 'faker';

type ProgramIntrospectionBody = types.rpc.ProgramIntrospectionBody;
type ProgramTriggerBody = types.rpc.ProgramTriggerBody;

export function getIntrospectionJson(
  template?: any,
  rules?: any,
  rewards?: any[],
): ProgramIntrospectionBody {
  return {
    messageType: 'PROGRAM_INTROSPECTION',
    template,
    rules,
    program: {
      id: 'r1',
      rules,
      rewards,
    },
  };
}

type ProgramTriggerInfo = {
  type: types.rpc.TriggerType;
  time?: number;
  user: any;
  rules: any;
};

export function getProgramTriggerJson(
  info: ProgramTriggerInfo,
): ProgramTriggerBody {
  return {
    messageType: 'PROGRAM_TRIGGER',
    activeTrigger: {
      type: info.type,
      time: info.time || Date.now(),
      user: info.user,
    },
    program: {
      id: 'r1',
      rules: info.rules,
    },
    tenant: {
      settings: {
        suspectedFraudModerationState: 'IGNORE',
      },
    },
    ids: [
      'triggergivenid1',
      'triggergivenid2',
      'triggergivenid3',
      'triggergivenid4',
      'triggergivenid5',
      'triggergivenid6',
      'triggergivenid7',
      'triggergivenid8',
      'triggergivenid9',
      'triggergivenid10',
    ],
  };
}

function getAUCOUTJson(prev?: any, events?: any[]): any {
  return {};
}

function getReferralJson(referralEventType: any, referral: any): any {
  return {};
}

function getAUEPTJson(events?: any[]): any {
  return {};
}

export function getRandomUser(name: string): any {
  return {
    id: `${name}ID`,
    accountId: `${name}ACCOUNTID`,
    firstName: faker.fake('{{name.firstName}}'),
    lastName: faker.fake('{{name.lastName}}'),
    email: faker.fake('{{internet.email}}'),
    dateCreated: Date.now(),
    customFields: {},
    segments: [],
    rewards: {
      totalCount: 0,
      data: [],
    },
    referrals: {
      totalCount: 0,
      data: [],
    },
  };
}
