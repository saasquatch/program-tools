import * as assert from "node:assert";
import { test } from "node:test";
import express from "express";
import request from "supertest";
import { asyncHandlerWrapper } from "../async-wrapper.ts";
import { requestIdAndLogger } from "../middleware.ts";
import { jestLogger } from "./util.ts";

void test("wrapper with no rejected promise", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async (_req, res) => {
      res.status(200).json({ status: "OK" });
      return Promise.resolve();
    }),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
  });
});

void test("wrapper with rejected promise", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      return Promise.reject(new Error("error message from the handler"));
    }),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        assert.strictEqual(typeof res.body.message, "string");
        assert.strictEqual(res.body.message, "error message from the handler");

        assert.strictEqual(typeof res.body.debugId, "string");
        assert.strictEqual(typeof res.body.requestId, "string");
        assert.strictEqual(typeof res.body.eStr, "string");
        assert.strictEqual(typeof res.body.eJson, "string");

        resolve();
      });
  });
});

void test("default error message", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      throw { random: "object" };
    }),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        assert.strictEqual(typeof res.body.message, "string");
        assert.strictEqual(res.body.message, "An internal error occurred");

        assert.strictEqual(typeof res.body.debugId, "string");
        assert.strictEqual(typeof res.body.requestId, "string");
        assert.strictEqual(typeof res.body.eStr, "string");
        assert.strictEqual(typeof res.body.eJson, "string");

        resolve();
      });
  });
});

void test("rejection after headers sent", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async (_req, res) => {
      res.status(200).json({ status: "going to fail later" });
      return Promise.reject(new Error("error message from the handler"));
    }),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        assert.strictEqual(typeof res.body.status, "string");
        assert.strictEqual(res.body.status, "going to fail later");

        resolve();
      });
  });
});

const renderErrorPage = () => Promise.resolve("");
const rejectErrorPage = (): Promise<string> =>
  Promise.reject(new Error("failed to render html error page"));

void test("custom html error page", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      return Promise.reject(new Error("error message from the handler"));
    }, renderErrorPage),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect("Content-Type", /html/)
      .expect(500)
      .end((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
  });
});

void test("custom html error page, no HTML accept header", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      return Promise.reject(new Error("error message from the handler"));
    }, renderErrorPage),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
  });
});

void test("error while rendering custom error page", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      return Promise.reject(new Error("error message from the handler"));
    }, rejectErrorPage),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "text/html")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        if (err) {
          reject(err);
          return;
        }

        assert.strictEqual(typeof res.body.message, "string");
        assert.strictEqual(res.body.message, "error message from the handler");

        resolve();
      });
  });
});
