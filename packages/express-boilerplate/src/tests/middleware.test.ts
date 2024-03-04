import {
  getLogger,
  initializeLogger,
  isLoggerInitialized,
} from "@saasquatch/logger";
import express from "express";
import request from "supertest";
import { requestIdAndLogger } from "../middleware";
import { Logger } from "winston";

const jestLogger = () => {
  if (isLoggerInitialized("jest-express-boilerplate")) {
    return getLogger("jest-express-boilerplate");
  }

  return initializeLogger("jest-express-boilerplate", {
    logLevel: "crit",
  });
};

test("requestIdAndLogger adds requestId and logger", (done) => {
  const app = express();
  const logger = jestLogger();
  app.use(requestIdAndLogger(logger));
  app.use((_req, res, next) => {
    expect(typeof res.locals.requestId).toBe("string");
    expect(res.locals.logger).toBeInstanceOf(Logger);
    next();
  });

  app.get("/", (_req, res) => res.status(200).json({ status: "OK" }));

  void request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err) => {
      if (err) throw err;
      done();
    });
});
