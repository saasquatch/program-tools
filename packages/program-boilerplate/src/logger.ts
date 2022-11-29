import { initializeLogger, LogLevel, LOG_LEVELS } from "@saasquatch/logger";
import { Logger } from "winston";

// Lazily initialized logger instance
let _logger: Logger;

/**
 * Returns a logger for the programs to use instead of
 * console.log
 *
 * @param {string} logLevel The log level
 *
 * @return {Logger} The winston logger
 */
export function getLogger(logLevel: string): Logger {
  if (_logger) {
    return _logger;
  }

  if (!LOG_LEVELS.includes(logLevel as LogLevel)) {
    logLevel = "info";
  }

  _logger = initializeLogger({
    logLevel: logLevel as LogLevel,
  });
  return _logger;
}

/**
 * Set the log level of the singleton logger.
 *
 * @param {string} logLevel The log level
 */
export function setLogLevel(logLevel: string) {
  if (!_logger) return;

  _logger.level = logLevel;
}
