import { createLogger, format, Logger, transports } from "winston";

// Lazily initialized logger instance
let _logger: Logger;

export type LogLevel =
  | "silly"
  | "debug"
  | "verbose"
  | "info"
  | "warn"
  | "error";
/**
 * Returns a logger for the programs to use instead of console.log,
 * providing a log level will set the log level of the singleton logger
 *
 * @param {string} logLevel The log level
 *
 * @return {Logger} The winston logger
 */
export function getLogger(logLevel?: LogLevel): Logger {
  if (_logger) {
    if (logLevel) _logger.level = logLevel;
    return _logger;
  }

  const logFormat = format.printf(({ level, message }) => {
    return `[${level.toUpperCase()}] ${message}`;
  });

  _logger = createLogger({
    level: logLevel || "info",
    format: format.combine(logFormat),
    transports: [new transports.Console()],
  });

  return _logger;
}

/**
 * Set the log level of the singleton logger.
 *
 * @param {string} logLevel The log level
 *
 * @return {Logger} The winston logger
 */
export function setLogLevel(logLevel: LogLevel): Logger {
  return getLogger(logLevel);
}

/**
 * Suppress all logs of the singleton logger.
 *
 * @param {string} logLevel The log level
 */
export function silenceLogger() {
  getLogger().silent = true;
}
