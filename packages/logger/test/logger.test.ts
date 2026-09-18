import assert from "node:assert/strict";
import { Writable } from "node:stream";
import { describe, test } from "node:test";
import {
  DEFAULT_LOG_COLLECTION_LIMIT,
  DEFAULT_LOGGER_NAME,
  getLogger,
  initializeLogger,
  isLoggerInitialized,
  Logger,
} from "../src/logger.ts";

class CaptureStream extends Writable {
  chunks: string[] = [];
  override _write(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    done: (error?: Error | null) => void,
  ) {
    this.chunks.push(chunk.toString());
    done();
  }
}

let sequence = 0;
const unique = (prefix: string) => `${prefix}-${++sequence}`;

void describe("logger initialization", () => {
  void test("accepts object-form configuration and reuses the default logger", () => {
    assert.equal(isLoggerInitialized(), false);
    const logger = initializeLogger({ sinks: [], level: "debug" });
    assert.equal(logger.name, DEFAULT_LOGGER_NAME);
    assert.equal(logger.level, "debug");
    assert.equal(isLoggerInitialized(), true);
    assert.equal(getLogger(), logger);
    assert.throws(() => initializeLogger(), /already been initialized/);
  });

  void test("supports named loggers and all initialization argument forms", () => {
    const named = unique("named");
    assert.equal(isLoggerInitialized(named), false);
    const auto = getLogger(named);
    assert.equal(isLoggerInitialized(named), true);
    assert.equal(auto.name, named);

    const configured = initializeLogger(unique("configured"), {
      sinks: [],
      level: "debug",
    });
    assert.equal(configured.level, "debug");
    assert.throws(
      () => initializeLogger({ sinks: [], level: "warning" }),
      /already been initialized/,
    );
  });
});

void describe("logging", () => {
  void test("writes JSON lines, applies level filtering, merges child fields, and shares serialization", () => {
    const one = new CaptureStream();
    const two = new CaptureStream();
    const logger = initializeLogger(unique("output"), {
      level: "info",
      sinks: [{ stream: one }, { stream: two }],
    });

    logger.debug("hidden");
    logger.info("visible", { requestId: "message" });
    logger
      .child({ requestId: "child", service: "api" })
      .warning({ message: "oops", requestId: "override" });

    assert.equal(one.chunks.length, 2);
    assert.deepEqual(one.chunks, two.chunks);
    assert.ok(one.chunks.every((line) => line.endsWith("\n")));
    const first = JSON.parse(one.chunks[0]);
    const second = JSON.parse(one.chunks[1]);
    assert.equal(first.message, "visible");
    assert.equal(first.requestId, "message");
    assert.equal(second.message, "oops");
    assert.equal(second.requestId, "override");
    assert.equal(second.service, "api");
  });

  void test("supports every convenience level and non-record messages", () => {
    const stream = new CaptureStream();
    const logger = new Logger(
      "levels",
      [(line) => stream.write(line)],
      "debug",
      {},
    );
    logger.emerg("emerg");
    logger.alert(null);
    logger.crit(["array"]);
    logger.error(new Error("error"));
    logger.warning("warning");
    logger.warn("warn");
    logger.notice("notice");
    logger.info("info");
    logger.debug("debug");
    assert.deepEqual(
      stream.chunks.map((line) => JSON.parse(line).level),
      [
        "emerg",
        "alert",
        "crit",
        "error",
        "warning",
        "warn",
        "notice",
        "info",
        "debug",
      ],
    );
  });

  void test("uses the console sink", () => {
    const writes: string[] = [];
    const originalWrite = process.stdout.write.bind(process.stdout);
    process.stdout.write = (chunk: string | Uint8Array) => {
      writes.push(chunk.toString());
      return true;
    };
    try {
      initializeLogger(unique("console"), {
        level: "info",
        sinks: [{ stream: process.stdout }],
      }).info("console message");
    } finally {
      process.stdout.write = originalWrite;
    }
    assert.equal(JSON.parse(writes[0]).message, "console message");
  });
});

void describe("log collection", () => {
  void test("collects without sinks, returns records or serialized NDJSON, and can stop and clear", () => {
    const logger = new Logger("collector", [], "debug", {});
    logger.startLogCollection();
    assert.equal(DEFAULT_LOG_COLLECTION_LIMIT, 500);
    logger.info("one");
    logger.info("two");
    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.message),
      ["one", "two"],
    );
    const serialized = logger.getCollectedLogs({ serialized: true });
    assert.deepEqual(
      serialized.split("\n").map((line) => JSON.parse(line).message),
      ["one", "two"],
    );
    logger.stopLogCollection();
    logger.info("not collected");
    assert.equal(logger.getCollectedLogs().length, 2);
    logger.clearCollectedLogs();
    assert.deepEqual(logger.getCollectedLogs(), []);
  });

  void test("keeps newest entries in ring order and retains newest records when resized", () => {
    const logger = new Logger("ring", [], "debug", {});
    logger.startLogCollection({ maxEntries: 3 });
    for (const message of ["one", "two", "three", "four"]) {
      logger.info(message);
    }

    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.message),
      ["two", "three", "four"],
    );

    logger.startLogCollection({ maxEntries: 2 });
    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.message),
      ["three", "four"],
    );
    logger.startLogCollection({ maxEntries: 2 });
    logger.info("five");
    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.message),
      ["four", "five"],
    );

    logger.startLogCollection({ maxEntries: 4 });
    logger.info("six");
    assert.deepEqual(
      logger.getCollectedLogs().map((record) => record.message),
      ["four", "five", "six"],
    );
  });

  void test("rejects invalid collection limits", () => {
    const logger = new Logger("invalid", [], "info", {});
    for (const maxEntries of [0, -1, 1.5, Number.NaN]) {
      assert.throws(
        () => logger.startLogCollection({ maxEntries }),
        /positive integer/,
      );
    }
  });
});
