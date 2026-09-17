import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import { defaultConfig, LOG_LEVELS, LOG_LEVEL_VALUES } from "../src/config.ts";
import { formatRecord, serializeRecord } from "../src/format.ts";
import { DEFAULT_LOGGER_NAME, LOG_TYPE_MARKER } from "../src/logger.ts";

void describe("configuration", () => {
  const originalLevel = process.env.SSQT_LOG_LEVEL;

  afterEach(() => {
    if (originalLevel === undefined) {
      delete process.env.SSQT_LOG_LEVEL;
    } else {
      process.env.SSQT_LOG_LEVEL = originalLevel;
    }
  });

  void test("uses stdout and info by default", () => {
    delete process.env.SSQT_LOG_LEVEL;
    assert.deepEqual(defaultConfig(), {
      logLevel: "info",
      transports: [{ type: "console" }],
    });
    assert.deepEqual(LOG_LEVELS, [
      "emerg",
      "alert",
      "crit",
      "error",
      "warning",
      "warn",
      "notice",
      "info",
      "debug",
    ]);
    assert.equal(LOG_LEVEL_VALUES.warning, LOG_LEVEL_VALUES.warn);
  });

  void test("accepts supported environment levels and rejects invalid ones", () => {
    process.env.SSQT_LOG_LEVEL = "debug";
    assert.equal(defaultConfig().logLevel, "debug");
    process.env.SSQT_LOG_LEVEL = "verbose";
    assert.throws(() => defaultConfig(), /Invalid log level "verbose"/);
  });
});

void describe("record formatting", () => {
  void test("formats ordinary, named, and tenant records without allowing fields to replace core fields", () => {
    const ordinary = formatRecord(DEFAULT_LOGGER_NAME, "info", "hello", {
      level: "debug",
      timestamp: "bad",
      status: "bad",
    });
    assert.equal(ordinary.level, "info");
    assert.equal(ordinary.message, "hello");
    assert.equal(ordinary.status, "info");
    assert.equal("logger.name" in ordinary, false);
    assert.doesNotThrow(() => new Date(ordinary.timestamp).toISOString());

    const tagged = formatRecord("api", "warning", "started", {
      tenantAlias: "acme",
    });
    assert.equal(tagged.message, "[acme] started");
    assert.equal(tagged["logger.name"], "api");
    assert.equal(
      formatRecord("api", "info", "[acme] done", { tenantAlias: "acme" })
        .message,
      "[acme] done",
    );
    assert.equal(
      formatRecord("api", "info", 12, { tenantAlias: "acme" }).message,
      12,
    );
    assert.equal(
      formatRecord("api", "info", "text", { tenantAlias: 12 }).message,
      "text",
    );
  });

  void test("normalizes HTTP records in microseconds and milliseconds", () => {
    const micro = formatRecord(
      "web",
      "info",
      {
        status: 201,
        method: "POST",
        time: 999n,
        url: "/items",
        requestId: "r1",
      },
      { [LOG_TYPE_MARKER]: "HTTP" },
    );
    assert.equal(micro.message, "201 POST 999 μs /items");
    assert.equal(micro["http.url"], "/items");
    assert.equal(micro["http.method"], "POST");
    assert.equal(micro["http.status_code"], 201);
    assert.equal(micro["http.response_time"], 999);
    assert.equal(micro["http.request_id"], "r1");
    assert.equal(LOG_TYPE_MARKER in micro, false);

    const milli = formatRecord(
      DEFAULT_LOGGER_NAME,
      "error",
      {
        status: 500,
        method: "GET",
        time: "1501",
        url: "/fail",
      },
      { [LOG_TYPE_MARKER]: "HTTP" },
    );
    assert.equal(milli.message, "500 GET   2 ms /fail");
    assert.equal("http.request_id" in milli, false);
  });

  void test("leaves malformed HTTP messages alone and always removes the marker", () => {
    for (const message of [null, "not an object"]) {
      const record = formatRecord(DEFAULT_LOGGER_NAME, "info", message, {
        [LOG_TYPE_MARKER]: "HTTP",
      });
      assert.equal(record.message, message);
      assert.equal(LOG_TYPE_MARKER in record, false);
    }

    assert.equal(
      formatRecord(DEFAULT_LOGGER_NAME, "info", "normal", {
        [LOG_TYPE_MARKER]: "OTHER",
      }).message,
      "normal",
    );
  });
});

void describe("safe serialization", () => {
  void test("serializes bigint, errors, circular references, and repeated non-circular references", () => {
    const error = new TypeError("bad input");
    const circular: Record<string, unknown> = { id: 1 };
    circular.self = circular;
    const shared = { value: 2n };
    const record = formatRecord(DEFAULT_LOGGER_NAME, "error", "failed", {
      error,
      circular,
      first: shared,
      second: shared,
    });
    const parsed = JSON.parse(serializeRecord(record));
    assert.equal(parsed.circular.self, "[Circular]");
    assert.deepEqual(parsed.first, { value: "2" });
    assert.deepEqual(parsed.second, { value: "2" });
    assert.equal(parsed.error.name, "TypeError");
    assert.equal(parsed.error.message, "bad input");
    assert.match(parsed.error.stack, /TypeError: bad input/);
  });
});
