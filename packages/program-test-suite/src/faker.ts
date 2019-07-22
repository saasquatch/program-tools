import {types} from '@saasquatch/program-boilerplate';

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
