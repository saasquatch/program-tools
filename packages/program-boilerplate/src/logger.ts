import { initializeLogger, type LogLevel } from "@saasquatch/logger";
import { Logger } from "winston";

// Lazily initialized logger instance
let logger: Logger;

/**
 * Returns a logger for the programs to use instead of
 * console.log
 *
 * @param {string} level The log level
 *
 * @return {Logger} The winston logger
 */
export function getLogger(level: LogLevel): Logger {
  if (logger) {
    return logger;
  }

  logger = initializeLogger({ logLevel: level });
  return logger;
}
