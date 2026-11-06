import {
  initializeLogger, getLogger, isLoggerInitialized,
  Logger, LOG_LEVELS, type LogLevel, type Sink,
} from "@saasquatch/logger";
import { createWriteStream, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { BaseConfig } from "./config.ts";

const LOGGER_NAME = "integration-boilerplate";

export function createLogger<Config extends BaseConfig>(config: Config): Logger {
  if (isLoggerInitialized(LOGGER_NAME)) return getLogger(LOGGER_NAME);

  if (
    config.serverLogLevel !== "none" &&
    !LOG_LEVELS.includes(config.serverLogLevel as LogLevel)
  ) {
    throw new Error(`Invalid value for server log level: "${config.serverLogLevel}"`);
  }

  // "none" silences all logging: no sinks, and the log file is never opened
  const sinks: Sink[] = [];
  if (config.serverLogLevel !== "none") {
    sinks.push({ stream: process.stdout });
    if (config.serverLogFile !== "") {
      mkdirSync(dirname(config.serverLogFile), { recursive: true });
      sinks.push({
        stream: createWriteStream(config.serverLogFile, { flags: "a" }),
      });
    }
  }

  return initializeLogger(LOGGER_NAME, {
    level: config.serverLogLevel === "none"
      ? "info" // unreachable by any sink — "none" produces an empty sink list
      : (config.serverLogLevel as LogLevel),
    sinks,
  });
}
