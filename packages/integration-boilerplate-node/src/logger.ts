import {
  initializeLogger, getLogger, isLoggerInitialized,
  Logger, LOG_LEVELS, type LogLevel, type Sink,
} from "@saasquatch/logger";
import { createWriteStream } from "node:fs";
import { BaseConfig } from "./config";

const LOGGER_NAME = "integration-boilerplate";

export function createLogger<Config extends BaseConfig>(config: Config): Logger {
  if (isLoggerInitialized(LOGGER_NAME)) return getLogger(LOGGER_NAME);

  if (
    config.serverLogLevel !== "none" &&
    !LOG_LEVELS.includes(config.serverLogLevel as LogLevel)
  ) {
    throw new Error(`Invalid value for server log level: "${config.serverLogLevel}"`);
  }

  const sinks: Sink[] =
    config.serverLogLevel === "none" ? [] : [{ stream: process.stdout }];

  if (config.serverLogFile !== "") {
    sinks.push({ stream: createWriteStream(config.serverLogFile, { flags: "a" }) });
  }

  return initializeLogger(LOGGER_NAME, {
    level: config.serverLogLevel === "none"
      ? "info" // irrelevant with no console sink — see decision below
      : (config.serverLogLevel as LogLevel),
    sinks,
  });
}
