import winston from "winston";
import { defaultConfig, LoggerConfig, Transport } from "./config";

let _loggers: Record<string, winston.Logger> = {};

export const LOG_TYPE_MARKER = "__ssqt_log_type";
const DEFAULT_LOGGER_NAME = "_sqqt_default_logger";

/**
 * Return the initialized logger. If the logger has not
 * yet been initialized, it will be initialized with the
 * default configuration
 *
 * @param {string | undefined} logger - The label of the logger to get
 * @return {winston.Logger} The logger
 */
export function getLogger(logger?: string): winston.Logger {
  const name = logger ?? DEFAULT_LOGGER_NAME;
  if (_loggers[name] === undefined) {
    initializeLogger(name);
  }
  return _loggers[name];
}

/**
 * Check if the given logger has been initialized yet
 *
 * @param {string | undefined} logger - The name of the logger
 * @return {boolean} Whether the logger has been initialized
 */
export function isLoggerInitialized(logger?: string): boolean {
  const name = logger ?? DEFAULT_LOGGER_NAME;
  return _loggers[name] !== undefined;
}

/**
 * Convenience shorthand for getLogger().log
 */
// @ts-ignore
export const log: winston.LeveledLogMethod = (...args): winston.Logger => {
  return getLogger().log(...args);
};

/**
 * Convenience shorthand for getLogger().info
 */
// @ts-ignore
export const info: winston.LeveledLogMethod = (...args): winston.Logger => {
  return getLogger().info(...args);
};

/**
 * Convenience shorthand for getLogger().warn
 */
// @ts-ignore
export const warn: winston.LeveledLogMethod = (...args): winston.Logger => {
  return getLogger().warn(...args);
};

/**
 * Convenience shorthand for getLogger().error
 */
// @ts-ignore
export const error: winston.LeveledLogMethod = (...args): winston.Logger => {
  return getLogger().error(...args);
};

/**
 * Initialize the logger, optionally with a custom configuration. Calling
 * this function when the logger has already been initialized will throw an error.
 *
 * @param {LoggerConfig | string | undefined} nameOrConfig - The logger config
 * to use, or the label of the logger to initialize
 * @param {LoggerConfig} config - The logger config to use, if the first parameter was the logger label
 * @return {winston.Logger} The initialized logger
 */
export function initializeLogger(
  nameOrConfig?: Partial<LoggerConfig> | string,
  config?: Partial<LoggerConfig>
): winston.Logger {
  const name =
    typeof nameOrConfig === "string" ? nameOrConfig : DEFAULT_LOGGER_NAME;

  if (_loggers[name] !== undefined) {
    throw new Error("Logger has already been initialized");
  }

  let finalConfig: Partial<LoggerConfig> = defaultConfig();
  if (config !== undefined) {
    finalConfig = config;
  } else if (nameOrConfig !== undefined && typeof nameOrConfig !== "string") {
    finalConfig = nameOrConfig;
  }

  const conf: LoggerConfig = {
    ...defaultConfig(),
    ...finalConfig,
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
      info["http.status_category"] = info.level;
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

  const addLoggerName =
    name !== DEFAULT_LOGGER_NAME
      ? format((info) => {
          info["logger.name"] = name;
          return info;
        })
      : format((info) => info);

  // clean up the log type marker which is only used for some of the previous
  // formatting middleware
  const cleanLogTypeMarker = format((info) => {
    delete info[LOG_TYPE_MARKER];
    return info;
  });

  _loggers[name] = winston.createLogger({
    level: conf.logLevel,
    levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      warn: 4,
      notice: 5,
      info: 6,
      debug: 7,
    },
    format: format.combine(
      format.timestamp(),
      format.splat(),
      addLoggerName(),
      formatHttpLog(),
      dataDogStatus(),
      ...(conf.environment === "production"
        ? [cleanLogTypeMarker(), format.json()]
        : [format.colorize(), format.simple(), prettyDevFormat])
    ),
    transports: conf.transports.map(transportConfigToRealTransport),
  });

  return _loggers[name];
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
