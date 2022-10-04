import {
  defaultConfig,
  LoggerConfig,
  LogLevel,
  LOG_LEVELS,
  ConsoleTransport,
  FileTransport,
  HttpTransport,
  StreamTransport,
  Transport,
} from "./config";
import {
  error,
  getLogger,
  info,
  initializeLogger,
  isLoggerInitialized,
  log,
  LOG_TYPE_MARKER,
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
  StreamTransport,
  Transport,
  defaultConfig,
  error,
  getLogger,
  httpLogMiddleware,
  info,
  initializeLogger,
  isLoggerInitialized,
  log,
  warn,
};
