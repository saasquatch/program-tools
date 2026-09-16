import * as assert from "node:assert";
import { describe, mock, test } from "node:test";
import Transaction from "../src/transaction.ts";
import { triggerProgram } from "../src/trigger.ts";
import type {
  Program,
  ProgramTriggerBody,
  ProgramTriggerHandler,
  ProgramVariableSchemaResult,
  RequirementValidationHandler,
  TriggerType,
} from "../src/types/rpc.ts";

// oxlint-disable typescript/no-floating-promises

describe("triggerProgram", () => {
  describe("body has invalid messageType", () => {
    const testBody = {
      messageType: "NOT_YET_ADDED_TO_BOILERPLATE",
    };
    const program = {
      NOT_YET_ADDED_TO_BOILERPLATE: () => {},
    };
    test("501 is returned", () => {
      const result = triggerProgram(
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        testBody as unknown as ProgramTriggerBody,
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        program as unknown as Program,
      );
      assert.deepStrictEqual(result, {
        json: {
          message: `Unrecognized messageType NOT_YET_ADDED_TO_BOILERPLATE`,
        },
        code: 501,
      });
    });
  });
  describe("body has messageType PROGRAM_INTROSPECTION", () => {
    const testBody = {
      messageType: "PROGRAM_INTROSPECTION" as const,
      template: { test: "template" },
      rules: [
        {
          rule: "dont talk about fight club",
        },
        {
          rule: "dont talk about fight club",
        },
        {
          rule: "dont talk about fight club",
        },
      ],
      program: {
        rules: [
          {
            rule: "dont talk about fight club",
          },
          {
            rule: "dont talk about fight club",
          },
          {
            rule: "dont talk about fight club",
          },
        ],
      },
      tenant: {
        tenantAlias: "tenantAlias",
        isLiveMode: true,
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "IGNORE",
          timeZone: "America/Vancouver",
        },
      },
    };
    const newTemplate = { template: {} };

    test("PROGRAM_INTROSPECTION", () => {
      const spy = mock.fn(() => newTemplate);
      const spyingProgram = {
        PROGRAM_INTROSPECTION: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(spy.mock.calls[0].arguments, [
        testBody.template,
        testBody.program.rules,
        testBody.program,
        testBody.tenant,
      ]);
      assert.deepStrictEqual(result, {
        json: newTemplate,
        code: 200,
      });
    });

    test("PROGRAM_INTROSPECTION errors", () => {
      const spy = mock.fn(() => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        PROGRAM_INTROSPECTION: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(spy.mock.calls[0].arguments, [
        testBody.template,
        testBody.program.rules,
        testBody.program,
        testBody.tenant,
      ]);
      assert.deepStrictEqual(result, {
        json: {
          error: "An error occurred in a webtask (PROGRAM_INTROSPECTION)",
          message: undefined,
        },
        code: 500,
      });
    });
  });

  describe("body has messageType PROGRAM_TRIGGER", () => {
    const testBody: ProgramTriggerBody = {
      messageType: "PROGRAM_TRIGGER" as const,
      ids: ["123", "456"],
      activeTrigger: {
        type: "AFTER_USER_EVENT_PROCESSED" as const,
        time: 1,
        user: {
          accountId: "accountId",
          id: "id",
          programGoals: [],
          localization: {},
          segments: [],
          fraudFlags: [],
          rewards: {
            totalCount: 0,
            data: [],
          },
          referrals: {
            totalCount: 0,
          },
        },
        events: [],
      },
      program: {
        id: "programName",
        rules: {},
        templateId: "",
      },
      tenant: {
        impactBrandId: null,
        settings: {
          suspectedFraudModerationState: "OK",
          timeZone: "America/Vancouver",
        },
      },
    };

    test("PROGRAM_TRIGGER", () => {
      const spy = mock.fn<ProgramTriggerHandler>();
      const spyingProgram = {
        AFTER_USER_EVENT_PROCESSED: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.ok(spy.mock.calls[0].arguments[0] instanceof Transaction);
      assert.deepStrictEqual(spy.mock.calls[0].arguments[0]["context"], {
        body: testBody,
      });
      assert.deepStrictEqual(result, {
        json: {
          mutations: [],
          analytics: [],
          programId: "programName",
        },
        code: 200,
      });
    });

    test("PROGRAM_TRIGGER errors", () => {
      const spy = mock.fn(() => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        AFTER_USER_EVENT_PROCESSED: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(result, {
        json: {
          error: "An error occurred in a webtask (AFTER_USER_EVENT_PROCESSED)",
          message: undefined,
        },
        code: 500,
      });
    });
  });

  describe("body has messageType PROGRAM_VALIDATION", () => {
    const testBody = {
      messageType: "PROGRAM_VALIDATION" as const,
      validationRequests: [
        {
          key: "rule1",
          queryResult: { test: "rule1" },
        },
        {
          key: "rule2",
          queryResult: { test: "rule2" },
        },
        {
          key: "rule3",
          queryResult: { test: "rule3" },
        },
      ],
      program: {
        id: "programName",
        test: "program",
        rules: [
          {
            key: "rule1",
          },
          {
            key: "rule2",
          },
          {
            key: "rule3",
          },
        ],
      },
      time: Date.now(),
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
    };

    test("PROGRAM_VALIDATION", () => {
      // oxlint-disable-next-line unicorn/consistent-function-scoping
      const validationResult = (num: number) => [
        {
          message: num.toString(),
          longDescription: num.toString(),
          status: "SUCCESS" as const,
        },
      ];

      const spy1 = mock.fn<RequirementValidationHandler>(() =>
        validationResult(1),
      );
      const spy2 = mock.fn<RequirementValidationHandler>(() =>
        validationResult(2),
      );
      const spy3 = mock.fn<RequirementValidationHandler>(() =>
        validationResult(3),
      );
      const spyingProgram = {
        PROGRAM_VALIDATION: {
          rule1: spy1,
          rule2: spy2,
          rule3: spy3,
        },
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(spy1.mock.calls[0].arguments, [
        { test: "rule1" },
        testBody.program,
        testBody.time,
      ]);
      assert.deepStrictEqual(spy2.mock.calls[0].arguments, [
        { test: "rule2" },
        testBody.program,
        testBody.time,
      ]);
      assert.deepStrictEqual(spy3.mock.calls[0].arguments, [
        { test: "rule3" },
        testBody.program,
        testBody.time,
      ]);

      assert.deepStrictEqual(result, {
        json: {
          validationResults: [
            { key: "rule1", results: validationResult(1) },
            { key: "rule2", results: validationResult(2) },
            { key: "rule3", results: validationResult(3) },
          ],
        },
        code: 200,
      });
    });

    test.skip("PROGRAM_VALIDATION errors - NEEDS IMPLEMENTATION", () => {});
  });

  describe("body has messageType PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST", () => {
    const testBody = {
      messageType: "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST" as const,
      triggerType: "AFTER_USER_EVENT_PROCESSED" as TriggerType,
      schema: "testSchema",
      scheduleKey: "testScheduleKey",
      program: {
        id: "programName",
        test: "program",
      },
      tenant: {
        settings: {
          suspectedFraudModerationState: "OK",
        },
      },
    };
    const newSchema = "newSchema";

    test("PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST", () => {
      const spy = mock.fn(
        // oxlint-disable-next-line typescript/no-unsafe-type-assertion
        () => newSchema as unknown as ProgramVariableSchemaResult,
      );
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(spy.mock.calls[0].arguments, [
        testBody.schema,
        testBody.triggerType,
        testBody.scheduleKey,
      ]);
      assert.deepStrictEqual(result, {
        json: {
          schema: newSchema,
        },
        code: 200,
      });
    });

    test("PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST errors", () => {
      const spy = mock.fn(() => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(result, {
        code: 204,
        json: {},
      });
    });

    test("PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST with no handler", () => {
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: undefined,
      };
      const result = triggerProgram(testBody, spyingProgram);
      assert.deepStrictEqual(result, {
        json: {},
        code: 204,
      });
    });
  });
});
