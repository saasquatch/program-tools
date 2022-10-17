import winston from "winston";
import { defaultConfig, LoggerConfig, Transport } from "./config";
import { jsonFormat, prettyFormat } from "./format";

let _loggers: Record<string, winston.Logger> = {};

export const LOG_TYPE_MARKER = "__ssqt_log_type";
export const DEFAULT_LOGGER_NAME = "_ssqt_default_logger";

export const SYSLOG_LOG_LEVELS = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

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

  _loggers[name] = winston.createLogger({
    level: conf.logLevel,
    levels: SYSLOG_LOG_LEVELS,
    format:
      conf.environment === "production" ? jsonFormat(name) : prettyFormat(name),
    transports: conf.transports.map(transportConfigToRealTransport(name)),
  });

  return _loggers[name];
}

export const transportConfigToRealTransport = (name: string) => {
  return (transport: Transport) => {
    switch (transport.type) {
      case "console":
        return new winston.transports.Console(transport.options);
      case "file":
        return new winston.transports.File({
          format: jsonFormat(name),
          ...transport.options,
        });
      case "http":
        return new winston.transports.Http({
          format: jsonFormat(name),
          ...transport.options,
        });
      case "stream":
        return new winston.transports.Stream({
          format: jsonFormat(name),
          stream: transport.stream,
          ...transport.options,
        });
    }
  };
};
