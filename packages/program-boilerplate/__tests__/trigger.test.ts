import Transaction from "../src/transaction";
import { triggerProgram } from "../src/trigger";
import {
  RequirementValidationHandler,
  TriggerType,
  ProgramVariableSchemaResult,
} from "../src/types/rpc";

const cachedLogger = console.log;
beforeAll(() => {
  console.log = () => {};
});
afterAll(() => {
  console.log = cachedLogger;
});
describe("triggerProgram", () => {
  describe("body has messageType PROGRAM_INTROSPECTION", () => {
    const testBody = {
      messageType: "PROGRAM_INTROSPECTION" as "PROGRAM_INTROSPECTION",
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
      },
    };
    const newTemplate = { test: "newTemplate" };

    test("PROGRAM_INTROSPECTION", () => {
      const spy = jest.fn((...args) => newTemplate);
      const spyingProgram = {
        PROGRAM_INTROSPECTION: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(spy.mock.calls[0]).toEqual([
        testBody.template,
        testBody.program.rules,
        testBody.program,
        testBody.tenant,
      ]);
      expect(result).toStrictEqual({
        json: newTemplate,
        code: 200,
      });
    });

    test("PROGRAM_INTROSPECTION errors", () => {
      const spy = jest.fn((...args) => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        PROGRAM_INTROSPECTION: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(spy.mock.calls[0]).toEqual([
        testBody.template,
        testBody.program.rules,
        testBody.program,
        testBody.tenant,
      ]);
      expect(result).toStrictEqual({
        json: {
          error: "An error occurred in a webtask",
          message: undefined,
        },
        code: 500,
      });
    });
  });

  describe("body has messageType PROGRAM_TRIGGER", () => {
    const testBody = {
      messageType: "PROGRAM_TRIGGER" as "PROGRAM_TRIGGER",
      ids: ["123", "456"],
      activeTrigger: { type: "AFTER_USER_EVENT_PROCESSED" },
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

    test("PROGRAM_TRIGGER", () => {
      const spy = jest.fn();
      const spyingProgram = {
        AFTER_USER_EVENT_PROCESSED: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(spy.mock.calls[0][0]).toBeInstanceOf(Transaction);
      expect(spy.mock.calls[0][0].context).toStrictEqual({ body: testBody });
      expect(result).toStrictEqual({
        json: {
          mutations: [],
          analytics: [],
          programId: "programName",
        },
        code: 200,
      });
    });

    test("PROGRAM_TRIGGER errors", () => {
      const spy = jest.fn((...args) => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        AFTER_USER_EVENT_PROCESSED: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(result).toStrictEqual({
        json: {
          error: "An error occurred in a webtask",
          message: undefined,
        },
        code: 500,
      });
    });
  });

  describe("body has messageType PROGRAM_VALIDATION", () => {
    const testBody = {
      messageType: "PROGRAM_VALIDATION" as "PROGRAM_VALIDATION",
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
      const spy1 = (jest.fn(
        () => 1
      ) as unknown) as RequirementValidationHandler;
      const spy2 = (jest.fn(
        () => 2
      ) as unknown) as RequirementValidationHandler;
      const spy3 = (jest.fn(
        () => 3
      ) as unknown) as RequirementValidationHandler;
      const spyingProgram = {
        PROGRAM_VALIDATION: {
          rule1: spy1,
          rule2: spy2,
          rule3: spy3,
        },
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect((spy1 as jest.Mock).mock.calls[0]).toEqual([
        { test: "rule1" },
        testBody.program,
        testBody.time,
      ]);
      expect((spy2 as jest.Mock).mock.calls[0]).toEqual([
        { test: "rule2" },
        testBody.program,
        testBody.time,
      ]);
      expect((spy3 as jest.Mock).mock.calls[0]).toEqual([
        { test: "rule3" },
        testBody.program,
        testBody.time,
      ]);

      expect(result).toStrictEqual({
        json: {
          validationResults: [
            { key: "rule1", results: 1 },
            { key: "rule2", results: 2 },
            { key: "rule3", results: 3 },
          ],
        },
        code: 200,
      });
    });

    test.skip("PROGRAM_VALIDATION errors - NEEDS IMPLEMENTATION", () => {});
  });

  describe("body has messageType PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST", () => {
    const testBody = {
      messageType: "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST" as "PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST",
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
      const spy = jest.fn(
        () => (newSchema as unknown) as ProgramVariableSchemaResult
      );
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(spy.mock.calls[0]).toEqual([
        testBody.schema,
        testBody.triggerType,
        testBody.scheduleKey,
      ]);
      expect(result).toStrictEqual({
        json: {
          schema: newSchema,
        },
        code: 200,
      });
    });

    test("PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST errors", () => {
      const spy = jest.fn((...args) => {
        const error = new Error();
        error.stack = undefined;
        throw error;
      });
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: spy,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(result).toStrictEqual({
        json: {},
        code: 204,
      });
    });

    test("PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST with no handler", () => {
      const spyingProgram = {
        PROGRAM_TRIGGER_VARIABLES_SCHEMA_REQUEST: undefined,
      };
      const result = triggerProgram(testBody, spyingProgram);
      expect(result).toStrictEqual({
        json: {},
        code: 204,
      });
    });
  });
});
