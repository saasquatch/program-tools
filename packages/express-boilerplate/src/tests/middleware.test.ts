import * as assert from "node:assert";
import { test } from "node:test";
import express from "express";
import request from "supertest";
import { requestIdAndLogger } from "../middleware.ts";
import { jestLogger } from "./util.ts";

void test("requestIdAndLogger adds requestId and logger", async () => {
  const app = express();
  const logger = jestLogger();
  app.use(requestIdAndLogger(logger));
  app.use((_req, res, next) => {
    assert.strictEqual(typeof res.locals["requestId"], "string");
    const requestLogger = res.locals["logger"];
    assert.notStrictEqual(requestLogger, logger);
    assert.strictEqual(requestLogger.name, logger.name);
    assert.strictEqual(typeof requestLogger.info, "function");
    next();
  });

  app.get("/", (_req, res) => res.status(200).json({ status: "OK" }));

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
