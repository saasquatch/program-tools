import { defaultConfig, LoggerConfig, LogLevel, LOG_LEVELS } from "./config";
import { getLogger, initializeLogger, LOG_TYPE_MARKER } from "./logger";
import { httpLogMiddleware } from "./plugins";

export {
  LOG_LEVELS,
  LOG_TYPE_MARKER,
  LogLevel,
  LoggerConfig,
  defaultConfig,
  getLogger,
  httpLogMiddleware,
  initializeLogger,
};
