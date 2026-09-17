import assert from "node:assert/strict";
import { test } from "node:test";
import {
  DEFAULT_LOGGER_NAME,
  getLogger,
  initializeLogger,
  isLoggerInitialized,
} from "../src/logger.ts";

void test("initializes the default logger when called without arguments", () => {
  assert.equal(isLoggerInitialized(), false);
  const logger = initializeLogger();
  assert.equal(logger.name, DEFAULT_LOGGER_NAME);
  assert.equal(logger.level, "info");
  assert.equal(isLoggerInitialized(), true);
  assert.equal(getLogger(), logger);
});
