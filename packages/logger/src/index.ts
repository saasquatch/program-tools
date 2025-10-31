import {
  ConsoleTransport,
  defaultConfig,
  FileTransport,
  HttpTransport,
  LoggerConfig,
  LogLevel,
  LOG_LEVELS,
  StreamTransport,
  Transport,
} from "./config";
import { jsonFormat, prettyFormat } from "./format";
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
} from "./logger";
import { httpLogMiddleware } from "./plugins";

export {
  ConsoleTransport,
  FileTransport,
  HttpTransport,
  LOG_LEVELS,
  LOG_TYPE_MARKER,
  LogLevel,
  LoggerConfig,
  SYSLOG_LOG_LEVELS,
  StreamTransport,
  Transport,
  defaultConfig,
  error,
  getLogger,
  httpLogMiddleware,
  info,
  initializeLogger,
  isLoggerInitialized,
  jsonFormat,
  prettyFormat,
  transportConfigToRealTransport,
  warn,
};
