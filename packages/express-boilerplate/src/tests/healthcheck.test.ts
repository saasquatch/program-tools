import express from "express";
import request from "supertest";
import { healthCheck } from "../healthcheck";
import { TERMINATION_APP_LOCAL_KEY } from "../shutdown";
import { jestLogger } from "./util";

test("returns 200 when not terminating", (done) => {
  const app = express();
  const logger = jestLogger();
  app.get("/healthz", healthCheck(app, logger));

  app.locals[TERMINATION_APP_LOCAL_KEY] = false;

  void request(app)
    .get("/healthz")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;

      expect(res.body.status).toBe("OK");
      done();
    });
});

test("returns 503 when terminating", (done) => {
  const app = express();
  const logger = jestLogger();
  app.get("/healthz", healthCheck(app, logger));

  app.locals[TERMINATION_APP_LOCAL_KEY] = true;

  void request(app)
    .get("/healthz")
    .expect("Content-Type", /json/)
    .expect(503)
    .end((err, res) => {
      if (err) throw err;

      expect(res.body.status).toBe("TERMINATING");
      done();
    });
});
