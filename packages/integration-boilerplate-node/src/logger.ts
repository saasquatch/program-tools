import {
  initializeLogger,
  LogLevel,
  LOG_LEVELS,
  Transport,
} from "@saasquatch/logger";
import winston from "winston";
import { BaseConfig } from "./config";

export function createLogger<Config extends BaseConfig>(
  config: Config
): winston.Logger {
  const transports: Transport[] = [{ type: "console" }];
  if (config.serverLogFile !== "") {
    transports.push({
      type: "file",
      options: {
        filename: config.serverLogFile,
      },
    });
  }

  if (!LOG_LEVELS.includes(config.serverLogLevel as LogLevel)) {
    throw new Error(
      `Invalid value for server log level: "${config.serverLogLevel}"`
    );
  }

  const logger = initializeLogger("integration-boilerplate", {
    logLevel: config.serverLogLevel as LogLevel,
    transports,
  });

  return logger;
}
