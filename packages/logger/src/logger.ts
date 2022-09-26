import winston from "winston";
import { defaultConfig, LoggerConfig, Transport } from "./config";

let _logger: winston.Logger | undefined;

export const LOG_TYPE_MARKER = "__ssqt_log_type";

/**
 * Return the initialized logger. If the logger has not
 * yet been initialized, this function returns undefined.
 *
 * @return {winston.Logger | undefined} The logger
 */
export function getLogger(): winston.Logger | undefined {
  return _logger;
}

/**
 * Initialize the logger, optionally with a custom configuration. Calling
 * this function when the logger has already been initialized will throw an error.
 *
 * @param {LoggerConfig | undefined} config - The logger config to use
 * @return {winston.Logger} The initialized logger
 */
export function initializeLogger(
  config?: Partial<LoggerConfig>
): winston.Logger {
  if (_logger !== undefined) {
    throw new Error("Logger has already been initialized");
  }

  const conf: LoggerConfig = {
    ...defaultConfig,
    ...config,
  };

  const format = winston.format;

  const formatResponseTime = format((info) => {
    if (info[LOG_TYPE_MARKER] === "HTTP") {
      const micros = Number(info.message.time);
      if (micros < 1000) {
        info.message.time = `${micros} μs`;
      } else {
        info.message.time = `${Math.round(micros / 1000)} ms`;
      }
    }
    return info;
  });

  const prettyDevFormat = format.printf((info) => {
    const message = info.message;
    if (typeof message === "object") {
      // if this is an HTTP router log we'll use a custom format
      if (info[LOG_TYPE_MARKER] === "HTTP") {
        info[LOG_TYPE_MARKER] = undefined;
        info.message = [
          message.status,
          message.method,
          message.time.toString().padStart(6, " "),
          message.url,
        ].join(" ");
      } else {
        // Auto-stringify objects so you can write logger.info(myObject) instead
        // of logger.info("%o", myObject). The latter format still works though
        info.message = JSON.stringify(info.message);
      }
    }

    return `[${info.level}] ${info.message}`;
  });

  // clean up the log type marker which is only used for some of the previous
  // formatting middleware
  const cleanLogTypeMarker = format((info) => {
    delete info[LOG_TYPE_MARKER];
    return info;
  });

  _logger = winston.createLogger({
    level: conf.logLevel,
    format: format.combine(
      format.timestamp(),
      format.splat(),
      formatResponseTime(),
      ...(conf.environment === "production"
        ? [cleanLogTypeMarker(), format.json()]
        : [format.colorize(), format.simple(), prettyDevFormat])
    ),
    transports: conf.transports.map(transportConfigToRealTransport),
  });

  return _logger;
}

function transportConfigToRealTransport(
  transport: Transport
): winston.transport {
  switch (transport.type) {
    case "console":
      return new winston.transports.Console(transport.options);
    case "file":
      return new winston.transports.File(transport.options);
    case "http":
      return new winston.transports.Http(transport.options);
    case "stream":
      return new winston.transports.Stream(transport.options);
  }
}
