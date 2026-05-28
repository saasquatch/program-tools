import * as assert from "node:assert";
import { describe, test } from "node:test";
import { getLogger, setLogLevel } from "../src/logger.ts";

const logger = getLogger("notice");
describe("#getLogger", () => {
  test("first call initializes the logger at the given level", () => {
    assert.ok(logger);
    assert.strictEqual(logger.level, "notice");
  });

  test("logger is only initialized once", () => {
    assert.deepStrictEqual(getLogger("warn"), logger);
  });
});

describe("#setLogLevel", () => {
  test("sets the log level of an initialized logger", () => {
    setLogLevel("crit");
    assert.strictEqual(logger.level, "crit");
  });
});
