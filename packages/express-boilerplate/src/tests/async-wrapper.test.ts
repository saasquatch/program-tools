import express from "express";
import { test } from "node:test";
import request from "supertest";
import { asyncHandlerWrapper } from "../async-wrapper.ts";
import { requestIdAndLogger } from "../middleware.ts";
import { jestLogger } from "./util.ts";
import * as assert from "node:assert";

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

test("wrapper with no rejected promise", async () => {
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
        if (err) reject(err);
        resolve();
      });
  });
});

test("wrapper with rejected promise", async () => {
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
        if (err) reject(err);

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

test("default error message", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      // eslint-disable-next-line -- @typescript-eslint/no-throw-literal
      throw { random: "object" };
      return Promise.resolve();
    }),
  );

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        if (err) reject(err);

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

test("rejection after headers sent", async () => {
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
        if (err) reject(err);

        assert.strictEqual(typeof res.body.status, "string");
        assert.strictEqual(res.body.status, "going to fail later");

        resolve();
      });
  });
});

test("custom html error page", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));
  const renderErrorPage = () => Promise.resolve("");

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
        if (err) reject(err);
        resolve();
      });
  });
});

test("custom html error page, no HTML accept header", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));
  const renderErrorPage = () => Promise.resolve("");

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
        if (err) reject(err);
        resolve();
      });
  });
});

test("error while rendering custom error page", async () => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  const renderErrorPage = (): Promise<string> =>
    Promise.reject(new Error("failed to render html error page"));

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
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, res) => {
        if (err) reject(err);

        assert.strictEqual(typeof res.body.message, "string");
        assert.strictEqual(res.body.message, "error message from the handler");

        resolve();
      });
  });
});
