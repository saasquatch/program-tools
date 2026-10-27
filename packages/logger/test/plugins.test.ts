import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { describe, test } from "node:test";
import { Logger } from "../src/logger.ts";
import { httpLogMiddleware } from "../src/plugins.ts";

class FakeResponse extends EventEmitter {
  statusCode: number;
  locals?: Record<string, unknown>;

  constructor(statusCode: number, locals?: Record<string, unknown>) {
    super();
    this.statusCode = statusCode;
    this.locals = locals;
  }
}

function performRequest(
  logger: Logger,
  statusCode: number,
  url: string,
  options?: Parameters<typeof httpLogMiddleware>[1],
  locals?: Record<string, unknown>,
  method = "GET",
) {
  const response = new FakeResponse(statusCode, locals);
  let nextCalls = 0;
  const middleware = httpLogMiddleware(logger, options);
  // only the request properties read by the middleware are needed
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const request = { method, originalUrl: url } as never;
  // FakeResponse implements the response properties used by the middleware
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const expressResponse = response as never;
  middleware(request, expressResponse, () => nextCalls++);
  assert.equal(nextCalls, 1);
  response.emit("finish");
}

function collector() {
  const logger = new Logger("http", [], "debug", {});
  logger.startLogCollection({ maxEntries: 20 });
  return logger;
}

void describe("HTTP logging middleware", () => {
  void test("logs successful responses and strips every sensitive query parameter", () => {
    const logger = collector();
    performRequest(
      logger,
      200,
      "/items?keep=yes&itoken=1&token=2&jwt=3&auth=4&password=5&bearer=6&key=7",
      undefined,
      { requestId: "request-1", extraData: { region: "ca" } },
      "POST",
    );
    const [record] = logger.getCollectedLogs();
    assert.equal(record?.level, "info");
    assert.equal(record?.message instanceof Object, false);
    assert.match(String(record?.message), /^200 POST .* \/items\?keep=yes$/);
    assert.equal(record?.["http.url"], "/items?keep=yes");
    assert.equal(record?.["http.request_id"], "request-1");
    assert.deepEqual(record?.extraData, { region: "ca" });
  });

  void test("uses configured success, client error, and server error levels", () => {
    const logger = collector();
    performRequest(logger, 204, "/ok", { nonErrorLogLevel: "notice" });
    performRequest(logger, 404, "/missing", { logNonErrorResponses: false });
    performRequest(logger, 500, "/broken");
    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.level),
      ["notice", "warn", "error"],
    );
  });

  void test("can suppress non-error responses", () => {
    const logger = collector();
    performRequest(logger, 200, "/quiet", { logNonErrorResponses: false });
    assert.deepEqual(logger.getCollectedLogs(), []);
  });

  void test("handles health checks specially", () => {
    const logger = collector();
    performRequest(logger, 200, "/healthz", { logHealthchecks: false });
    performRequest(logger, 503, "/readyz");
    performRequest(logger, 200, "/livez");
    assert.equal(logger.getCollectedLogs().length, 1);
    assert.equal(logger.getCollectedLogs()[0]?.level, "debug");
  });

  void test("works when response locals are absent", () => {
    const logger = collector();
    performRequest(logger, 201, "/created");
    const record = logger.getCollectedLogs()[0];
    assert.equal("http.request_id" in record, false);
    assert.equal(record.extraData, undefined);
  });
});
