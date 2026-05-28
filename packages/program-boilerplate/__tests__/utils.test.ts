import jsonata from "jsonata";
import * as assert from "node:assert";
import { describe, test } from "node:test";
import { rewardScheduleQuery } from "../src/queries.ts";
import type { ProgramTriggerBody } from "../src/types/rpc.ts";
import {
  getGoalAnalyticTimestamp,
  getRewardUnitsFromJsonata,
  getTriggerSchema,
  inferType,
  numToEquality,
  setRewardSchedule,
} from "../src/utils.ts";

describe("#inferType", () => {
  test("Booleans are inferred", () => {
    assert.deepStrictEqual(inferType("true"), true);
    assert.deepStrictEqual(inferType("false"), false);
  });

  test("Numbers are inferred", () => {
    assert.deepStrictEqual(inferType("3.1415"), 3.1415);
    assert.deepStrictEqual(inferType("29"), 29);
    assert.deepStrictEqual(inferType("0"), 0);
    assert.deepStrictEqual(inferType("NaN"), NaN);
    assert.deepStrictEqual(inferType("Infinity"), Infinity);
    assert.deepStrictEqual(inferType("-Infinity"), -Infinity);
  });

  test("undefined and null are inferred", () => {
    assert.deepStrictEqual(inferType("undefined"), undefined);
    assert.deepStrictEqual(inferType("null"), null);
  });

  test("objects are inferred", () => {
    assert.deepStrictEqual(inferType("[true, false]"), [true, false]);
    assert.deepStrictEqual(inferType('{"key1":true,"key2":false}'), {
      key1: true,
      key2: false,
    });
    assert.deepStrictEqual(inferType('{"key1": 3.14, "key2": "3.14" }'), {
      key1: 3.14,
      key2: "3.14",
    });
  });

  test("strings that look like objects but that are invalid return undefined", () => {
    assert.deepStrictEqual(inferType("{:-)}"), undefined);
    assert.deepStrictEqual(inferType("[:-)]"), undefined);
  });

  test("otherwise input is inferred as a string", () => {
    assert.deepStrictEqual(inferType("UNDEFINED"), "UNDEFINED");
    assert.deepStrictEqual(inferType("Null"), "Null");
    assert.deepStrictEqual(inferType("yes"), "yes");
    assert.deepStrictEqual(inferType(":D"), ":D");
  });
});

describe("#numToEquality", () => {
  test("number is converted to equality string", () => {
    assert.deepStrictEqual(numToEquality(0), "eq");
    assert.deepStrictEqual(numToEquality(1), "gte");
    assert.deepStrictEqual(numToEquality(2), "lte");
  });
  test("default return is 'eq'", () => {
    assert.deepStrictEqual(numToEquality(-1), "eq");
    assert.deepStrictEqual(numToEquality(666), "eq");
    assert.deepStrictEqual(numToEquality("testAString" as any), "eq");
  });
});

describe("#getTriggerSchema", () => {
  test("it converts AFTER_USER_CREATED_OR_UPDATED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      ids: ["123", "345", "456"],
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_CREATED_OR_UPDATED" as const,
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        previous: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 321,
          },
        },
      },
    };

    const expectedOutput = [
      {
        type: "AFTER_USER_CREATED_OR_UPDATED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        previous: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 321,
          },
        },
      },
    ];

    assert.deepStrictEqual(
      getTriggerSchema(programTriggerBody),
      expectedOutput,
    );
  });

  test("it converts REFERRAL triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "REFERRAL",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    };

    const expectedOutput = [
      {
        type: "REFERRAL",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        referral: undefined,
      },
    ];

    assert.deepStrictEqual(
      getTriggerSchema(programTriggerBody),
      expectedOutput,
    );
  });

  test("it converts AFTER_USER_EVENT_PROCESSED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        events: [
          {
            key: "subscription",
            id: "1",
            dateTriggered: 1619483037800,
            isModification: false,
            fields: {
              key: "value1",
            },
          },
          {
            key: "purchase",
            id: "2",
            dateTriggered: 1619483037830,
            isModification: false,
            fields: {
              key: "value2",
            },
          },
          {
            key: "ride",
            id: "3",
            dateTriggered: 1619483037860,
            isModification: false,
            fields: {
              key: "value3",
            },
          },
        ],
      },
    };

    const expectedOutput = [
      {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "subscription",
          id: "1",
          dateTriggered: 1619483037800,
          isModification: false,
          fields: {
            key: "value1",
          },
        },
      },
      {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "purchase",
          id: "2",
          dateTriggered: 1619483037830,
          isModification: false,
          fields: {
            key: "value2",
          },
        },
      },
      {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "ride",
          id: "3",
          dateTriggered: 1619483037860,
          isModification: false,
          fields: {
            key: "value3",
          },
        },
      },
    ];

    assert.deepStrictEqual(
      getTriggerSchema(programTriggerBody),
      expectedOutput,
    );
  });

  test("it converts SCHEDULED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "SCHEDULED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    };

    const expectedOutput = [
      {
        type: "SCHEDULED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    ];

    assert.deepStrictEqual(
      getTriggerSchema(programTriggerBody),
      expectedOutput,
    );
  });

  test("it converts REWARD_SCHEDULED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "REWARD_SCHEDULED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    };

    const expectedOutput = [
      {
        type: "REWARD_SCHEDULED",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    ];

    assert.deepStrictEqual(
      getTriggerSchema(programTriggerBody),
      expectedOutput,
    );
  });

  test("throw error on unexpected trigger type", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody: ProgramTriggerBody = {
      messageType,
      program: {
        id: "programid",
        rules: {},
        templateId: "",
      },
      ids: ["123", "345", "456"],
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        // @ts-expect-error -- intentionally wrong for testing
        type: "NOTVALID",
        time: 1619483037813,
        user: {
          id: "referrer",
          accountId: "referrer",
          programGoals: [],
          customFields: {
            test: 123,
          },
        },
      },
    };

    assert.throws(
      () => {
        getTriggerSchema(programTriggerBody);
      },
      { message: "Trigger type did not match expected options" },
    );
  });
});

describe("#getGoalAnalyticTimestamp", () => {
  test("returns trigger timestamp if no purchase events exist", () => {
    const trigger = {
      time: 1619483037813,
      events: [
        {
          key: "subscription",
          dateTriggered: 1619483037653,
        },
        {
          key: "subscription",
          dateTriggered: 1619482037653,
        },
        {
          key: "subscription",
          dateTriggered: 1619481037653,
        },
      ],
    };
    assert.deepStrictEqual(getGoalAnalyticTimestamp(trigger), 1619483037813);
  });

  test("returns event timestamp - 1 ms if purchase event exists", () => {
    const trigger = {
      time: 1619483037813,
      events: [
        {
          key: "subscription",
          dateTriggered: 1619483037653,
        },
        {
          key: "purchase",
          dateTriggered: 1619482037653,
        },
        {
          key: "subscription",
          dateTriggered: 1619481037653,
        },
      ],
    };
    assert.deepStrictEqual(getGoalAnalyticTimestamp(trigger), 1619482037652);
  });
});

describe("#getRewardUnitsFromJsonata", () => {
  test("returns nothing when jsonata expression doesn't have any reward units", () => {
    const expr = jsonata(`123`).ast();
    const result = getRewardUnitsFromJsonata(expr);
    assert.deepStrictEqual(result, undefined);
  });

  test("returns reward unit when it is only a string literal", () => {
    const expr = jsonata(`"POINT"`).ast();
    const result = getRewardUnitsFromJsonata(expr);
    assert.notStrictEqual(result, undefined);
    assert.deepStrictEqual(result!.sort(), ["POINT"]);
  });

  test("returns reward unit from single branch ternary", () => {
    const expr = jsonata(`user.customFields.test = "test" ? "USD"`).ast();
    const result = getRewardUnitsFromJsonata(expr);
    assert.notStrictEqual(result, undefined);
    assert.deepStrictEqual(result!.sort(), ["USD"]);
  });

  test("returns reward units from multi branch ternary", () => {
    const expr = jsonata(
      `user.customFields.test = "test" ? "USD" : "CAD"`,
    ).ast();
    const result = getRewardUnitsFromJsonata(expr);
    assert.notStrictEqual(result, undefined);
    assert.deepStrictEqual(result!.sort(), ["CAD", "USD"]);
  });

  test("returns reward units from nested multi branch ternary statements", () => {
    const expr = jsonata(
      `user.customFields.test = "test" ? "USD" : user.customFields.test = "test2" ? "CAD" : "GBP"`,
    ).ast();
    const result = getRewardUnitsFromJsonata(expr);
    assert.notStrictEqual(result, undefined);
    assert.deepStrictEqual(result!.sort(), ["CAD", "GBP", "USD"]);
  });
});

describe("#setRewardSchedule", () => {
  test("if expiryWarningDays is 0, original template is returned", () => {
    const template = {
      otherKey: "value",
      schedules: [
        {
          key: "rewardScheduleKey",
          type: "REWARD",
          filter: {
            dateExpires_timeframe: "next_10_days",
          },
          query: "rewardScheduleQuery",
          periodInHours: 24,
        },
      ],
    };

    assert.deepStrictEqual(
      setRewardSchedule({
        template,
        expiryWarningDays: 0,
        key: "anotherKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      }),
      template,
    );
  });

  test("reward schedule is added to template schedules", () => {
    const template = {
      otherKey: "value",
      schedules: [
        {
          key: "rewardScheduleKey",
          type: "REWARD",
          filter: {
            dateExpires_timeframe: "next_10_days",
          },
          query: "rewardScheduleQuery",
          periodInHours: 24,
        },
      ],
    };

    const expectedOutput = {
      otherKey: "value",
      schedules: [
        {
          key: "rewardScheduleKey",
          type: "REWARD",
          filter: {
            dateExpires_timeframe: "next_10_days",
          },
          query: "rewardScheduleQuery",
          periodInHours: 24,
        },
        {
          key: "anotherScheduleKey",
          type: "REWARD",
          filter: {
            dateExpires_timeframe: "next_14_days",
          },
          query: rewardScheduleQuery("anotherEmailKey"),
          periodInHours: 36,
        },
      ],
    };

    assert.deepStrictEqual(
      setRewardSchedule({
        template,
        expiryWarningDays: 14,
        key: "anotherScheduleKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      }),
      expectedOutput,
    );
  });

  test("reward schedule is added to template schedules if no current schedules exist", () => {
    const template = {
      otherKey: "value",
    };

    const expectedOutput = {
      otherKey: "value",
      schedules: [
        {
          key: "anotherScheduleKey",
          type: "REWARD",
          filter: {
            dateExpires_timeframe: "next_14_days",
          },
          query: rewardScheduleQuery("anotherEmailKey"),
          periodInHours: 36,
        },
      ],
    };

    assert.deepStrictEqual(
      setRewardSchedule({
        template,
        expiryWarningDays: 14,
        key: "anotherScheduleKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      }),
      expectedOutput,
    );
  });
});
