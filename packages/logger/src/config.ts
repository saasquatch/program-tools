import winston from "winston";

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

export const defaultConfig: LoggerConfig = {
  logLevel: "info",
  environment: process.env.NODE_ENV ?? "production",
  transports: [{ type: "console" }],
};
