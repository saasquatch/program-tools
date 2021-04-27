import { rewardScheduleQuery } from "../src/queries";
import {
  getGoalAnalyticTimestamp,
  getTriggerSchema,
  inferType,
  numToEquality,
  setRewardSchedule,
} from "../src/utils";

describe("#inferType", () => {
  test("Booleans are inferred", () => {
    expect(inferType("true")).toBe(true);
    expect(inferType("false")).toBe(false);
  });

  test("Numbers are inferred", () => {
    expect(inferType("3.1415")).toBe(3.1415);
    expect(inferType("29")).toBe(29);
    expect(inferType("0")).toBe(0);
    expect(inferType("NaN")).toBe(NaN);
    expect(inferType("Infinity")).toBe(Infinity);
    expect(inferType("-Infinity")).toBe(-Infinity);
  });

  test("undefined and null are inferred", () => {
    expect(inferType("undefined")).toBe(undefined);
    expect(inferType("null")).toBe(null);
  });

  test("objects are inferred", () => {
    expect(inferType("[true, false]")).toStrictEqual([true, false]);
    expect(inferType('{"key1":true,"key2":false}')).toStrictEqual({
      key1: true,
      key2: false,
    });
    expect(inferType('{"key1": 3.14, "key2": "3.14" }')).toStrictEqual({
      key1: 3.14,
      key2: "3.14",
    });
  });

  test("otherwise input is inferred as a string", () => {
    expect(inferType("UNDEFINED")).toBe("UNDEFINED");
    expect(inferType("Null")).toBe("Null");
    // this is failing v
    // expect(inferType("{:-)]")).toBe("{:-)}");
    expect(inferType("yes")).toBe("yes");
    expect(inferType(":D")).toBe(":D");
  });
});

describe("#numToEquality", () => {
  test("number is converted to equality string", () => {
    expect(numToEquality(0)).toBe("eq");
    expect(numToEquality(1)).toBe("gte");
    expect(numToEquality(2)).toBe("lte");
  });
  test("default return is 'eq'", () => {
    expect(numToEquality(-1)).toBe("eq");
    expect(numToEquality(666)).toBe("eq");
    expect(numToEquality("testAString" as any)).toBe("eq");
  });
});

describe("#getTriggerSchema", () => {
  test("it converts AFTER_USER_CREATED_OR_UPDATED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_CREATED_OR_UPDATED",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        previous: "testValue",
      },
    };

    const expectedOutput = [
      {
        type: "AFTER_USER_CREATED_OR_UPDATED",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        previous: "testValue",
      },
    ];

    expect(getTriggerSchema(programTriggerBody)).toStrictEqual(expectedOutput);
  });

  test("it converts REFERRAL triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "REFERRAL",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        referral: "testValue",
      },
    };

    const expectedOutput = [
      {
        type: "REFERRAL",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        referral: "testValue",
      },
    ];

    expect(getTriggerSchema(programTriggerBody)).toStrictEqual(expectedOutput);
  });

  test("it converts AFTER_USER_EVENT_PROCESSED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        events: [
          {
            key: "subscription",
            id: 1,
            dateTriggered: 1619483037800,
            fields: {
              key: "value1",
            },
          },
          {
            key: "purchase",
            id: 2,
            dateTriggered: 1619483037830,
            fields: {
              key: "value2",
            },
          },
          {
            key: "ride",
            id: 3,
            dateTriggered: 1619483037860,
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
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "subscription",
          id: 1,
          dateTriggered: 1619483037800,
          fields: {
            key: "value1",
          },
        },
      },
      {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "purchase",
          id: 2,
          dateTriggered: 1619483037830,
          fields: {
            key: "value2",
          },
        },
      },
      {
        type: "AFTER_USER_EVENT_PROCESSED",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
        event: {
          key: "ride",
          id: 3,
          dateTriggered: 1619483037860,
          fields: {
            key: "value3",
          },
        },
      },
    ];

    expect(getTriggerSchema(programTriggerBody)).toStrictEqual(expectedOutput);
  });

  test("it converts SCHEDULED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "SCHEDULED",
        time: 1619483037813,
        user: {
          id: "refferer",
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
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
      },
    ];

    expect(getTriggerSchema(programTriggerBody)).toStrictEqual(expectedOutput);
  });

  test("it converts REWARD_SCHEDULED triggers", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "REWARD_SCHEDULED",
        time: 1619483037813,
        user: {
          id: "refferer",
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
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
      },
    ];

    expect(getTriggerSchema(programTriggerBody)).toStrictEqual(expectedOutput);
  });

  test("throw error on unexpected trigger type", () => {
    const messageType: "PROGRAM_TRIGGER" = "PROGRAM_TRIGGER";
    const programTriggerBody = {
      messageType,
      program: "programTestValue",
      ids: ["123", "345", "456"],
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
      activeTrigger: {
        type: "NOTVALID",
        time: 1619483037813,
        user: {
          id: "refferer",
          customFields: {
            test: 123,
          },
        },
      },
    };

    expect(() => {
      getTriggerSchema(programTriggerBody);
    }).toThrowError("Trigger type did not match expected options");
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
    expect(getGoalAnalyticTimestamp(trigger)).toBe(1619483037813);
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
    expect(getGoalAnalyticTimestamp(trigger)).toBe(1619482037652);
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

    expect(
      setRewardSchedule({
        template,
        expiryWarningDays: 0,
        key: "anotherKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      })
    ).toStrictEqual(template);
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

    expect(
      setRewardSchedule({
        template,
        expiryWarningDays: 14,
        key: "anotherScheduleKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      })
    ).toStrictEqual(expectedOutput);
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

    expect(
      setRewardSchedule({
        template,
        expiryWarningDays: 14,
        key: "anotherScheduleKey",
        emailKey: "anotherEmailKey",
        periodInHours: 36,
      })
    ).toStrictEqual(expectedOutput);
  });
});
