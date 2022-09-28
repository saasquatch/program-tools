import winston from "winston";

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

export type LogLevel = typeof LOG_LEVELS[number];

export type ConsoleTransport = {
  type: "console";
  options?: winston.transports.ConsoleTransportOptions;
};

export type FileTransport = {
  type: "file";
  options?: winston.transports.FileTransportOptions;
};

export type HttpTransport = {
  type: "http";
  options?: winston.transports.HttpTransportOptions;
};

export type StreamTransport = {
  type: "stream";
  options?: winston.transports.StreamTransportOptions;
};

export type Transport =
  | ConsoleTransport
  | FileTransport
  | HttpTransport
  | StreamTransport;

export type LoggerConfig = {
  /**
   * The log level. Defaults to "info"
   */
  logLevel: LogLevel;

  /**
   * The NodeJS environment. Defaults to `process.env.NODE_ENV`
   */
  environment: string;

  /**
   * The list of transports to log to. Defaults to a single Console
   * transport.
   */
  transports: Transport[];
};

/**
 * Retrieve the default configuration based on sane defaults
 * and optional environment variables
 *
 * @return {LoggerConfig} The default logging configuration
 */
export function defaultConfig(): LoggerConfig {
  let transports: Transport[] = [{ type: "console" }];

  if (process.env["SQQT_LOG_TRANSPORTS"] !== undefined) {
    try {
      transports = JSON.parse(process.env["SQQT_LOG_TRANSPORTS"]);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }

      throw new Error(
        "Failed to parse log transports from environment variable"
      );
    }
  }

  let logLevel: LogLevel = "info";
  const logEnv = process.env["SQQT_LOG_LEVEL"];
  if (logEnv !== undefined) {
    if (LOG_LEVELS.includes(logEnv as LogLevel)) {
      logLevel = logEnv as LogLevel;
    } else {
      throw new Error(`Invalid log level "${logEnv}"`);
    }
  }

  return {
    logLevel,
    environment: process.env.NODE_ENV ?? "production",
    transports,
  };
}
