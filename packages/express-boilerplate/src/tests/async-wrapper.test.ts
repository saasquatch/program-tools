import express from "express";
import request from "supertest";
import { asyncHandlerWrapper } from "../async-wrapper";
import { requestIdAndLogger } from "../middleware";
import { jestLogger } from "./util";

test("wrapper with no rejected promise", (done) => {
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

  void request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err) => {
      if (err) throw err;
      done();
    });
});

test("wrapper with rejected promise", (done) => {
  const app = express();
  const logger = jestLogger();

  app.use(requestIdAndLogger(logger));

  app.get(
    "/",
    asyncHandlerWrapper(async () => {
      return Promise.reject(new Error("error message from the handler"));
    }),
  );

  void request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err, res) => {
      if (err) throw err;

      expect(typeof res.body.message).toBe("string");
      expect(res.body.message).toBe("error message from the handler");

      expect(typeof res.body.debugId).toBe("string");
      expect(typeof res.body.requestId).toBe("string");
      expect(typeof res.body.eStr).toBe("string");
      expect(typeof res.body.eJson).toBe("string");

      done();
    });
});

test("default error message", (done) => {
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

  void request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err, res) => {
      if (err) throw err;

      expect(typeof res.body.message).toBe("string");
      expect(res.body.message).toBe("An internal error occurred");

      expect(typeof res.body.debugId).toBe("string");
      expect(typeof res.body.requestId).toBe("string");
      expect(typeof res.body.eStr).toBe("string");
      expect(typeof res.body.eJson).toBe("string");

      done();
    });
});

test("rejection after headers sent", (done) => {
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

  void request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;

      expect(typeof res.body.status).toBe("string");
      expect(res.body.status).toBe("going to fail later");

      done();
    });
});

test("custom html error page", (done) => {
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

  void request(app)
    .get("/")
    .set("Accept", "text/html")
    .expect("Content-Type", /html/)
    .expect(500)
    .end((err) => {
      if (err) throw err;
      done();
    });
});

test("custom html error page, no HTML accept header", (done) => {
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

  void request(app)
    .get("/")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err) => {
      if (err) throw err;
      done();
    });
});

test("error while rendering custom error page", (done) => {
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

  void request(app)
    .get("/")
    .set("Accept", "text/html")
    .expect("Content-Type", /json/)
    .expect(500)
    .end((err, res) => {
      if (err) throw err;

      expect(typeof res.body.message).toBe("string");
      expect(res.body.message).toBe("error message from the handler");

      done();
    });
});
