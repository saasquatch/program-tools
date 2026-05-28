import express from "express";
import * as assert from "node:assert";
import { test } from "node:test";
import request from "supertest";
import { Logger } from "winston";
import { requestIdAndLogger } from "../middleware.ts";
import { jestLogger } from "./util.ts";

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

test("requestIdAndLogger adds requestId and logger", async () => {
  const app = express();
  const logger = jestLogger();
  app.use(requestIdAndLogger(logger));
  app.use((_req, res, next) => {
    assert.strictEqual(typeof res.locals["requestId"], "string");
    assert.ok(res.locals["logger"] instanceof Logger);
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
