import type { Writable } from "node:stream";

/**
 * Numerical Code | Severity
 *        0       | Emergency: system is unusable
 *        1       | Alert: action must be taken immediately
 *        2       | Critical: critical conditions
 *        3       | Error: error conditions
 *        4       | Warning: warning conditions
 *        5       | Notice: normal but significant condition
 *        6       | Informational: informational messages
 *        7       | Debug: debug-level messages
 *
 * Table 2. Syslog Message Severities
 * RFC 5424
 * https://www.rfc-editor.org/rfc/rfc5424#section-6.2.1
 */
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
  /**
   * Minimum severity to emit. Defaults to `info`
   */
  logLevel: LogLevel;

  /**
   * Outputs for log records. Defaults to stdout
   */
  transports: Transport[];
};

export function defaultConfig(): LoggerConfig {
  const transports: Transport[] = [{ type: "console" }];

  const configuredLevel = process.env["SSQT_LOG_LEVEL"];
  let logLevel: LogLevel = "info";

  if (configuredLevel !== undefined) {
    const levelValid = ((l: string): l is LogLevel => {
      return (LOG_LEVELS as readonly string[]).includes(l);
    })(configuredLevel);

    if (!levelValid) {
      throw new Error(`Invalid log level "${configuredLevel}"`);
    }

    logLevel = configuredLevel;
  }

  return { logLevel, transports };
}
