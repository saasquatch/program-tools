import * as request from "supertest";
import { webtask } from "../src/index";

describe("webtask express wrapper functionality", () => {
  // hopefully can remove this once the console logs are cleaned up in trigger.ts
  const cachedLogger = console.log;
  beforeAll(() => {
    console.log = () => {};
  });
  afterAll(() => {
    console.log = cachedLogger;
  });
  const testSuccessBody = {
    messageType: "PROGRAM_INTROSPECTION" as "PROGRAM_INTROSPECTION",
    template: { test: "template" },
    rules: [
      {
        rule: "there are no rules",
      },
    ],
    program: {
      rules: [
        {
          rule: "there are no rules",
        },
      ],
    },
    tenant: {
      tenantAlias: "tenantAlias",
      isLiveMode: true,
    },
  };
  const newTemplate = { test: "newTemplate" };

  const testErrorBody = {
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

  const successSpy = jest.fn((...args) => newTemplate);
  const errorSpy = jest.fn((...args) => {
    const error = new Error();
    error.stack = "message";
    throw error;
  });

  const testProgram = {
    PROGRAM_INTROSPECTION: successSpy,
    AFTER_USER_EVENT_PROCESSED: errorSpy,
  };
  describe("POST requests are handled by triggerProgram", () => {
    // Since we can't easily spy on the triggerProgram call
    // assert that it responds properly with two simple triggers
    // which are tested throughly in trigger.test.ts
    const app = webtask(testProgram);
    test("success returns appropiate code and json", async () => {
      const response = await request(app)
        .post("/test-endpoint")
        .send(testSuccessBody);
      expect(response.body).toStrictEqual(newTemplate);
      expect(response.status).toBe(200);
    });

    test("error returns appropiate code and json", async () => {
      const response = await request(app)
        .post("/test-endpoint")
        .send(testErrorBody);
      expect(response.body).toStrictEqual({
        error: "An error occurred in a webtask",
        message: "message",
      });
      expect(response.status).toBe(500);
    });
  });

  describe("HTTPS", () => {
    const nodeEnv = process.env.NODE_ENV;
    beforeAll(() => {
      // pretend its production for a second
      process.env.NODE_ENV = "production";
    });
    afterAll(() => {
      process.env.NODE_ENV = nodeEnv;
    });

    test("is enforced", async () => {
      const app = webtask(testProgram);
      const res = await request(app)
        .post("/")
        .send(testSuccessBody)
        .set("X-Forwarded-Proto", "https");
      expect(res.status).toBe(200);

      const res2 = await request(app)
        .post("/")
        .send(testSuccessBody)
        .set("X-Forwarded-Proto", "http");

      expect(res2.status).toBe(403);
      expect(res2.body).toStrictEqual({ message: "SSL required" });
    });
  });
});
