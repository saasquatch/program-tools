import { createWriteStream, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import {
  initializeLogger,
  getLogger,
  isLoggerInitialized,
  Logger,
  LOG_LEVELS,
  type LogLevel,
  type Sink,
} from "@saasquatch/logger";
import { BaseConfig } from "./config.ts";

const LOGGER_NAME = "integration-boilerplate";

function isLogLevel(value: string): value is LogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}

export function createLogger(config: BaseConfig): Logger {
  if (isLoggerInitialized(LOGGER_NAME)) return getLogger(LOGGER_NAME);

  // "none" silences all logging: no sinks, and the log file is never opened.
  // The "info" level is then unreachable by any sink — empty sink list.
  const sinks: Sink[] = [];
  let level: LogLevel = "info";
  if (config.serverLogLevel !== "none") {
    if (!isLogLevel(config.serverLogLevel)) {
      throw new Error(
        `Invalid value for server log level: "${config.serverLogLevel}"`,
      );
    }
    level = config.serverLogLevel;
    sinks.push({ stream: process.stdout });
    if (config.serverLogFile !== "") {
      mkdirSync(dirname(config.serverLogFile), { recursive: true });
      sinks.push({
        stream: createWriteStream(config.serverLogFile, { flags: "a" }),
      });
    }
  }

  return initializeLogger(LOGGER_NAME, { level, sinks });
}
