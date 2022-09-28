import { defaultConfig, LoggerConfig, LogLevel, LOG_LEVELS } from "./config";
import {
  error,
  getLogger,
  info,
  initializeLogger,
  log,
  LOG_TYPE_MARKER,
  warn,
} from "./logger";
import { httpLogMiddleware } from "./plugins";

export {
  LOG_LEVELS,
  LOG_TYPE_MARKER,
  LogLevel,
  LoggerConfig,
  defaultConfig,
  error,
  getLogger,
  httpLogMiddleware,
  info,
  initializeLogger,
  log,
  warn,
};
