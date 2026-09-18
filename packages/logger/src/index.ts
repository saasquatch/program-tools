import {
  DEFAULT_SINK_QUEUE_SIZE,
  LOG_LEVELS,
  defaultConfig,
  type LogLevel,
  type LoggerConfig,
  type Sink,
} from "./config.ts";
import type { LogRecord } from "./format.ts";
import {
  DEFAULT_LOG_COLLECTION_LIMIT,
  Logger,
  getLogger,
  initializeLogger,
  isLoggerInitialized,
  type GetCollectedLogsOptions,
  type LogCollectionOptions,
} from "./logger.ts";
import { httpLogMiddleware } from "./plugins.ts";

export {
  DEFAULT_LOG_COLLECTION_LIMIT,
  DEFAULT_SINK_QUEUE_SIZE,
  LOG_LEVELS,
  Logger,
  defaultConfig,
  getLogger,
  httpLogMiddleware,
  initializeLogger,
  isLoggerInitialized,
  type GetCollectedLogsOptions,
  type LogCollectionOptions,
  type LogLevel,
  type LogRecord,
  type LoggerConfig,
  type Sink,
};
