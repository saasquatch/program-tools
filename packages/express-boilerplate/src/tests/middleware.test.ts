import express from "express";
import request from "supertest";
import { Logger } from "winston";
import { requestIdAndLogger } from "../middleware";
import { jestLogger } from "./util";

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
