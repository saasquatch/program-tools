import { types } from "@saasquatch/program-boilerplate";
import * as faker from "faker";
import { TenantFlavor } from "./types";
import { randomBytes } from "crypto";

type ProgramIntrospectionBody = types.rpc.ProgramIntrospectionBody;
type ProgramTriggerBody = types.rpc.ProgramTriggerBody;
type ProgramValidationBody = types.rpc.ProgramValidationBody;
type ValidationRequest = types.rpc.ValidationRequest;

export function getValidationJson(
  reqs: ValidationRequest[],
  id: string,
  rules: any
): ProgramValidationBody {
  return {
    messageType: "PROGRAM_VALIDATION",
    validationRequests: reqs,
    time: 1500000000000,
    program: {
      id,
      rules,
    },
  };
}

export function getIntrospectionJson(input: {
  template?: any;
  rules?: any;
  rewards?: any[];
  featureFlags?: string[] | null | undefined;
  timeZone?: string;
}): ProgramIntrospectionBody {
  return {
    messageType: "PROGRAM_INTROSPECTION",
    template: input.template,
    rules: input.rules,
    program: {
      id: "r1",
      rules: input.rules,
      rewards: input.rewards,
    },
    tenant: {
      tenantAlias: "test_UNITTESTTENANT",
      isLiveMode: false,
      featureFlags: input.featureFlags,
      impactBrandId: "123456",
      settings: {
        timeZone: input.timeZone ?? "America/Vancouver",
      },
    },
  };
}

type ProgramTriggerInfo = {
  type: types.rpc.ActiveTriggerType;
  time?: number;
  user: any;
  rules: any;
};

export function getProgramTriggerJson(input: {
  info: ProgramTriggerInfo;
  flavor: TenantFlavor;
  timeZone?: string;
}): Omit<ProgramTriggerBody, "activeTrigger"> & {
  activeTrigger: Partial<ProgramTriggerBody["activeTrigger"]>;
} {
  return {
    messageType: "PROGRAM_TRIGGER",
    activeTrigger: {
      type: input.info.type,
      time: input.info.time ?? Date.now(),
      user: input.info.user,
    },
    program: {
      id: "r1",
      rules: input.info.rules,
      templateId: randomBytes(8).toString("hex"),
    },
    tenant: {
      impactBrandId: input.flavor === "impact" ? "12345" : undefined,
      settings: {
        suspectedFraudModerationState: "IGNORE",
        timeZone: input.timeZone ?? "America/Vancouver",
      },
    },
    ids: [...Array(10).keys()].map((a) => `triggergivenid${a + 1}`),
  };
}

export function getAUCOUTJson(previous?: any, events?: any[]): any {
  return {
    activeTrigger: {
      events,
      previous,
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
    firstName: faker.fake("{{name.firstName}}"),
    lastName: faker.fake("{{name.lastName}}"),
    email: faker.fake("{{internet.email}}"),
    dateCreated: Date.now(),
    customFields: {},
    segments: [],
    referredByReferral: {
      id: "REFERRALID",
      referrerUser: {
        id: "REFERRERID",
        accountId: "REFERRERACCOUNTID",
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
