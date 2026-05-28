import {
  type ConsoleTransport,
  defaultConfig,
  type FileTransport,
  type HttpTransport,
  LOG_LEVELS,
  type LoggerConfig,
  type LogLevel,
  type StreamTransport,
  type Transport,
} from "./config.ts";
import { jsonFormat, prettyFormat } from "./format.ts";
import {
  error,
  getLogger,
  info,
  initializeLogger,
  isLoggerInitialized,
  LOG_TYPE_MARKER,
  SYSLOG_LOG_LEVELS,
  transportConfigToRealTransport,
  warn,
} from "./logger.ts";
import { httpLogMiddleware } from "./plugins.ts";

export {
  defaultConfig,
  error,
  getLogger,
  httpLogMiddleware,
  info,
  initializeLogger,
  isLoggerInitialized,
  jsonFormat,
  LOG_LEVELS,
  LOG_TYPE_MARKER,
  prettyFormat,
  SYSLOG_LOG_LEVELS,
  transportConfigToRealTransport,
  warn,
  type ConsoleTransport,
  type FileTransport,
  type HttpTransport,
  type LoggerConfig,
  type LogLevel,
  type StreamTransport,
  type Transport,
};
