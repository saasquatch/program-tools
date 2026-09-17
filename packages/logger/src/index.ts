import {
  type ConsoleTransport,
  defaultConfig,
  LOG_LEVELS,
  type LoggerConfig,
  type LogLevel,
  type StreamTransport,
  type Transport,
} from "./config.ts";
import type { LogRecord } from "./format.ts";
import {
  DEFAULT_LOG_COLLECTION_LIMIT,
  type GetCollectedLogsOptions,
  getLogger,
  initializeLogger,
  isLoggerInitialized,
  LOG_TYPE_MARKER,
  type LogCollectionOptions,
  Logger,
} from "./logger.ts";
import { httpLogMiddleware } from "./plugins.ts";

export {
  DEFAULT_LOG_COLLECTION_LIMIT,
  defaultConfig,
  getLogger,
  httpLogMiddleware,
  initializeLogger,
  isLoggerInitialized,
  LOG_LEVELS,
  LOG_TYPE_MARKER,
  type ConsoleTransport,
  type GetCollectedLogsOptions,
  type LogCollectionOptions,
  Logger,
  type LoggerConfig,
  type LogLevel,
  type LogRecord,
  type StreamTransport,
  type Transport,
};
