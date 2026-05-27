import express from "express";
import * as assert from "node:assert";
import { test } from "node:test";
import request from "supertest";
import { healthCheck } from "../healthcheck.ts";
import { TERMINATION_APP_LOCAL_KEY } from "../shutdown.ts";
import { jestLogger } from "./util.ts";

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

test("returns 200 when not terminating", async () => {
  const app = express();
  const logger = jestLogger();
  app.get("/healthz", healthCheck(app, logger));

  app.locals[TERMINATION_APP_LOCAL_KEY] = false;

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/healthz")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) reject(err);

        assert.strictEqual(res.body.status, "OK");
        resolve();
      });
  });
});

test("returns 503 when terminating", async () => {
  const app = express();
  const logger = jestLogger();
  app.get("/healthz", healthCheck(app, logger));

  app.locals[TERMINATION_APP_LOCAL_KEY] = true;

  await new Promise<void>((resolve, reject) => {
    request(app)
      .get("/healthz")
      .expect("Content-Type", /json/)
      .expect(503)
      .end((err, res) => {
        if (err) reject(err);

        assert.strictEqual(res.body.status, "TERMINATING");
        resolve();
      });
  });
});
