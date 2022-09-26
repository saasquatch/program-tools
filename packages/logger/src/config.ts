export const LOG_LEVELS = [
  "emerg",
  "alert",
  "crit",
  "error",
  "warning",
  "notice",
  "info",
  "debug",
] as const;

export type LogLevel = typeof LOG_LEVELS[number];

export type LoggerConfig = {
  /**
   * The log level. Defaults to "info"
   */
  logLevel: LogLevel;

  /**
   * The NodeJS environment. Defaults to `process.env.NODE_ENV`
   */
  environment: string;
};

export const defaultConfig: LoggerConfig = {
  logLevel: "info",
  environment: process.env.NODE_ENV ?? "production",
};
