import {
  LOG_LEVELS,
  initializeLogger,
  type LogLevel,
  type Logger,
} from "@saasquatch/logger";

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
export function getLogger(level: string): Logger {
  if (logger) {
    return logger;
  }

  const validLevel = ((l): l is LogLevel => {
    return (LOG_LEVELS as readonly string[]).includes(l);
  })(level);

  if (!validLevel) {
    throw new Error(`Invalid log level "${level}"`);
  }

  logger = initializeLogger({ level });
  return logger;
}
