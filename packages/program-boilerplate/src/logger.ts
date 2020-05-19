import {createLogger, format, Logger, transports} from 'winston';

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

  const logFormat = format.printf(({level, message}) => {
    return `[${level.toUpperCase()}] ${message}`;
  });

  _logger = createLogger({
    level: logLevel,
    format: format.combine(logFormat),
    transports: [new transports.Console()],
  });

  return _logger;
}
