import type { Writable } from "node:stream";
import {
  defaultConfig,
  LOG_LEVEL_VALUES,
  type LoggerConfig,
  type LogLevel,
  type Transport,
} from "./config.ts";
import { formatRecord, serializeRecord, type LogRecord } from "./format.ts";

export type LogCollectionOptions = {
  /** Maximum number of records retained. The newest records are kept. */
  maxEntries?: number;
};

export type GetCollectedLogsOptions = {
  serialized?: boolean;
};

export const DEFAULT_LOG_COLLECTION_LIMIT = 1000;

export const LOG_TYPE_MARKER = "__ssqt_log_type";
export const DEFAULT_LOGGER_NAME = "_ssqt_default_logger";

/** Numeric values retained for callers that used the old syslog mapping. */
export const SYSLOG_LOG_LEVELS = LOG_LEVEL_VALUES;

export interface Logger {
  readonly name: string;
  level: LogLevel;
  log(
    level: LogLevel,
    message: unknown,
    fields?: Record<string, unknown>,
  ): void;
  emerg(message: unknown, fields?: Record<string, unknown>): void;
  alert(message: unknown, fields?: Record<string, unknown>): void;
  crit(message: unknown, fields?: Record<string, unknown>): void;
  error(message: unknown, fields?: Record<string, unknown>): void;
  warning(message: unknown, fields?: Record<string, unknown>): void;
  warn(message: unknown, fields?: Record<string, unknown>): void;
  notice(message: unknown, fields?: Record<string, unknown>): void;
  info(message: unknown, fields?: Record<string, unknown>): void;
  debug(message: unknown, fields?: Record<string, unknown>): void;
  child(record: Record<string, unknown>): Logger;
  startLogCollection(options?: LogCollectionOptions): void;
  stopLogCollection(): void;
  getCollectedLogs<T extends boolean = false>(
    opts?: GetCollectedLogsOptions & { serialized?: T },
  ): T extends true ? string : LogRecord[];
  clearCollectedLogs(): void;
}

type Sink = (serializedRecord: string) => void;
const _loggers = new Map<string, Logger>();

export function getLogger(logger?: string): Logger {
  const name = logger ?? DEFAULT_LOGGER_NAME;
  if (!_loggers.has(name)) {
    initializeLogger(name);
  }
  return _loggers.get(name)!;
}

export function isLoggerInitialized(logger?: string): boolean {
  return _loggers.has(logger ?? DEFAULT_LOGGER_NAME);
}

export function initializeLogger(
  nameOrConfig?: Partial<LoggerConfig> | string,
  config?: Partial<LoggerConfig>,
): Logger {
  const name =
    typeof nameOrConfig === "string" ? nameOrConfig : DEFAULT_LOGGER_NAME;

  if (_loggers.has(name)) {
    throw new Error("Logger has already been initialized");
  }

  const supplied =
    config ?? (typeof nameOrConfig === "string" ? {} : (nameOrConfig ?? {}));

  const conf: LoggerConfig = { ...defaultConfig(), ...supplied };
  const sinks = conf.transports.map(transportToSink);
  const level = { value: conf.logLevel };
  const logger = createLogger(name, sinks, level, {});

  _loggers.set(name, logger);
  return logger;
}

function createLogger(
  name: string,
  sinks: Sink[],
  level: { value: LogLevel },
  baseFields: Record<string, unknown>,
): Logger {
  const collection: {
    enabled: boolean;
    maxEntries: number;
    records: LogRecord[];
    start: number;
    size: number;
  } = {
    enabled: false,
    maxEntries: DEFAULT_LOG_COLLECTION_LIMIT,
    records: [],
    start: 0,
    size: 0,
  };

  const logger: Logger = {
    name,

    get level() {
      return level.value;
    },

    set level(value: LogLevel) {
      level.value = value;
    },

    log(messageLevel, message, fields) {
      if (LOG_LEVEL_VALUES[messageLevel] > LOG_LEVEL_VALUES[level.value]) {
        return;
      }

      let actualMessage = message;
      let messageFields = fields ?? {};
      if (fields === undefined && isRecord(message)) {
        messageFields = message;
        actualMessage = message["message"];
      }

      // Per-message fields take precedence over inherited child fields.
      const record = formatRecord(name, messageLevel, actualMessage, {
        ...baseFields,
        ...messageFields,
      });

      if (collection.enabled) {
        const index =
          (collection.start + collection.size) % collection.maxEntries;

        collection.records[index] = record;
        if (collection.size < collection.maxEntries) {
          collection.size += 1;
        } else {
          collection.start = (collection.start + 1) % collection.maxEntries;
        }
      }

      // Do not serialize when there are no active sinks (for example, when
      // this logger is only being used for collection). Serialization is also
      // shared across all sinks.
      if (sinks.length > 0) {
        const serializedRecord = `${serializeRecord(record)}\n`;
        for (const sink of sinks) {
          sink(serializedRecord);
        }
      }
    },

    child(record) {
      return createLogger(name, sinks, level, { ...baseFields, ...record });
    },

    startLogCollection(options) {
      const maxEntries = options?.maxEntries ?? DEFAULT_LOG_COLLECTION_LIMIT;

      if (!Number.isInteger(maxEntries) || maxEntries < 1) {
        throw new Error("Log collection maxEntries must be a positive integer");
      }

      if (collection.maxEntries !== maxEntries) {
        const retained = getCollectedRecords(collection);
        const records = retained.slice(-maxEntries);
        collection.records = records;
        collection.start = 0;
        collection.size = records.length;
      }

      collection.maxEntries = maxEntries;
      collection.enabled = true;
    },

    stopLogCollection() {
      collection.enabled = false;
    },

    getCollectedLogs<T extends boolean = false>(
      opts?: GetCollectedLogsOptions & { serialized?: T },
    ): T extends true ? string : LogRecord[] {
      const records = getCollectedRecords(collection);
      if (opts?.serialized) {
        return records.map(serializeRecord).join("\n") as T extends true
          ? string
          : LogRecord[];
      }

      return records as T extends true ? string : LogRecord[];
    },

    clearCollectedLogs() {
      collection.records.length = 0;
      collection.start = 0;
      collection.size = 0;
    },

    emerg(message, fields) {
      this.log("emerg", message, fields);
    },

    alert(message, fields) {
      this.log("alert", message, fields);
    },

    crit(message, fields) {
      this.log("crit", message, fields);
    },

    error(message, fields) {
      this.log("error", message, fields);
    },

    warning(message, fields) {
      this.log("warning", message, fields);
    },

    warn(message, fields) {
      this.log("warn", message, fields);
    },

    notice(message, fields) {
      this.log("notice", message, fields);
    },

    info(message, fields) {
      this.log("info", message, fields);
    },

    debug(message, fields) {
      this.log("debug", message, fields);
    },
  };
  return logger;
}

function getCollectedRecords(collection: {
  records: LogRecord[];
  start: number;
  size: number;
  maxEntries: number;
}): LogRecord[] {
  return Array.from({ length: collection.size }, (_unused, index) => {
    return collection.records[
      (collection.start + index) % collection.maxEntries
    ];
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function transportToSink(transport: Transport): Sink {
  const stream: Writable =
    transport.type === "console" ? process.stdout : transport.stream;

  return (serializedRecord) => {
    stream.write(serializedRecord);
  };
}
