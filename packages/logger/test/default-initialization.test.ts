import assert from "node:assert/strict";
import { afterEach, describe, test } from "node:test";
import {
  DEFAULT_LOGGER_NAME,
  getLogger,
  initializeLogger,
  isLoggerInitialized,
} from "../src/logger.ts";

void describe("configuration", () => {
  const originalLevel = process.env.SSQT_LOG_LEVEL;

  afterEach(() => {
    if (originalLevel === undefined) {
      delete process.env.SSQT_LOG_LEVEL;
    } else {
      process.env.SSQT_LOG_LEVEL = originalLevel;
    }
  });

  void test("initializes the default logger when called without arguments", () => {
    delete process.env.SSQT_LOG_LEVEL;
    assert.equal(isLoggerInitialized(), false);
    const logger = initializeLogger();
    assert.equal(logger.name, DEFAULT_LOGGER_NAME);
    assert.equal(logger.level, "info");
    assert.equal(isLoggerInitialized(), true);
    assert.equal(getLogger(), logger);
  });
});
