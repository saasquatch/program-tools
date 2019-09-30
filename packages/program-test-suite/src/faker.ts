import {types} from '@saasquatch/program-boilerplate';
import * as faker from 'faker';

type ProgramIntrospectionBody = types.rpc.ProgramIntrospectionBody;
type ProgramTriggerBody = types.rpc.ProgramTriggerBody;
type ProgramValidationBody = types.rpc.ProgramValidationBody;
type ValidationRequest = types.rpc.ValidationRequest;

export function getValidationJson(
  reqs: ValidationRequest[],
  id: string,
  rules: any,
): ProgramValidationBody {
  return {
    messageType: 'PROGRAM_VALIDATION',
    validationRequests: reqs,
    time: 1500000000000,
    program: {
      id,
      rules,
    },
  };
}

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
    tenant: {
      tenantAlias: 'test_UNITTESTTENANT',
      isLiveMode: false,
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
    ids: [...Array(10).keys()].map(a => `triggergivenid${a + 1}`),
  };
}

export function getAUCOUTJson(prev?: any, events?: any[]): any {
  return {
    activeTrigger: {
      events,
      prev,
    },
  };
}

export function getReferralJson(referralEventType: any, referral: any): any {
  return {
    activeTrigger: {
      referral,
    },
  };
}

export function getAUEPTJson(events?: any[]): any {
  return {
    activeTrigger: {
      events,
    },
  };
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
    referredByReferral: {
      id: 'REFERRALID',
      referrerUser: {
        id: 'REFERRERID',
        accountId: 'REFERRERACCOUNTID',
        dateBlocked: undefined,
        rewards: {
          totalCount: 0,
          data: [],
        },
      },
      rewards: [],
    },
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
