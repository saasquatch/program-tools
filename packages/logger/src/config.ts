import type { Writable } from "node:stream";

/** Syslog-compatible logging levels, from most to least severe. */
export const LOG_LEVELS = [
  "emerg",
  "alert",
  "crit",
  "error",
  "warning",
  "warn",
  "notice",
  "info",
  "debug",
] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
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

export type ConsoleTransport = {
  type: "console";
};

export type StreamTransport = {
  type: "stream";
  stream: Writable;
};

export type Transport = ConsoleTransport | StreamTransport;

export type LoggerConfig = {
  /** Minimum severity to emit. Defaults to `info`. */
  logLevel: LogLevel;
  /** Retained for compatibility and future output policies. */
  environment: string;
  /** Outputs for log records. Defaults to stdout. */
  transports: Transport[];
};

export function defaultConfig(): LoggerConfig {
  const transports: Transport[] = [{ type: "console" }];

  const configuredLevel = process.env["SSQT_LOG_LEVEL"];
  let logLevel: LogLevel = "info";
  if (configuredLevel !== undefined) {
    if (!LOG_LEVELS.includes(configuredLevel as LogLevel)) {
      throw new Error(`Invalid log level "${configuredLevel}"`);
    }
    logLevel = configuredLevel as LogLevel;
  }

  return {
    logLevel,
    environment: process.env["NODE_ENV"] ?? "production",
    transports,
  };
}
