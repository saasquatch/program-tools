import winston from "winston";
import { defaultConfig, LoggerConfig, Transport } from "./config";

let _logger: winston.Logger | undefined;

export const LOG_TYPE_MARKER = "__ssqt_log_type";

/**
 * Return the initialized logger. If the logger has not
 * yet been initialized, this function returns undefined.
 *
 * @return {winston.Logger} The logger
 */
export function getLogger(): winston.Logger {
  if (_logger === undefined) {
    initializeLogger();
  }
  return _logger!;
}

/**
 * Convenience shorthand for getLogger().log
 */
export function log(): winston.LogMethod {
  return getLogger().log;
}

/**
 * Convenience shorthand for getLogger().info
 */
export function info(): winston.LeveledLogMethod {
  return getLogger().info;
}

/**
 * Convenience shorthand for getLogger().warn
 */
export function warn(): winston.LeveledLogMethod {
  return getLogger().warn;
}

/**
 * Convenience shorthand for getLogger().error
 */
export function error(): winston.LeveledLogMethod {
  return getLogger().error;
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
    ...defaultConfig(),
    ...config,
  };

  const format = winston.format;

  const formatHttpLog = format((info) => {
    const message = info.message;
    if (info[LOG_TYPE_MARKER] === "HTTP") {
      const micros = Number(info.message.time);
      if (micros < 1000) {
        message.time = `${micros} μs`;
      } else {
        message.time = `${Math.round(micros / 1000)} ms`;
      }

      info.message = friendlyHttpFormat(message);
      info["http.url"] = message.url;
      info["http.method"] = message.method;
      info["http.status_code"] = message.status;
      info["http.response_time"] = message.time;
    }
    return info;
  });

  /*
   * The `status` field of the JSON is reserved in Datadog for the severity
   * level of the log.
   */
  const dataDogStatus = format((info) => {
    info.status = info.level;
    return info;
  });

  const prettyDevFormat = format.printf((info) => {
    const message = info.message;
    if (typeof message === "object") {
      info.message = JSON.stringify(info.message);
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
      formatHttpLog(),
      dataDogStatus(),
      ...(conf.environment === "production"
        ? [cleanLogTypeMarker(), format.json()]
        : [format.colorize(), format.simple(), prettyDevFormat])
    ),
    transports: conf.transports.map(transportConfigToRealTransport),
  });

  return _logger;
}

export function friendlyHttpFormat(message: {
  method: string;
  status: string;
  time: BigInt;
  url: string;
}): string {
  return [
    message.status,
    message.method,
    message.time.toString().padStart(6, " "),
    message.url,
  ].join(" ");
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
