import {
  initializeLogger,
  LogLevel,
  LOG_LEVELS,
  Transport,
} from "@saasquatch/logger";
import { getLogger, isLoggerInitialized } from "@saasquatch/logger";
import winston from "winston";
import { BaseConfig } from "./config";

const LOGGER_NAME = "integration-boilerplate";

export function createLogger<Config extends BaseConfig>(
  config: Config
): winston.Logger {
  if (isLoggerInitialized(LOGGER_NAME)) {
    return getLogger(LOGGER_NAME);
  }

  const transports: Transport[] = [
    { type: "console", options: { silent: config.serverLogLevel === "none" } },
  ];

  if (config.serverLogFile !== "") {
    transports.push({
      type: "file",
      options: {
        filename: config.serverLogFile,
      },
    });
  }

  if (
    config.serverLogLevel !== "none" &&
    !LOG_LEVELS.includes(config.serverLogLevel as LogLevel)
  ) {
    throw new Error(
      `Invalid value for server log level: "${config.serverLogLevel}"`
    );
  }

  const logger = initializeLogger(LOGGER_NAME, {
    logLevel: config.serverLogLevel as LogLevel,
    transports,
  });

  return logger;
}
