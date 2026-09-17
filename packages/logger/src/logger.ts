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
  /**
   * Maximum number of records retained. The newest records are kept.
   */
  maxEntries?: number;
};

export type GetCollectedLogsOptions = {
  serialized?: boolean;
};

export const DEFAULT_LOG_COLLECTION_LIMIT = 500;

export const LOG_TYPE_MARKER = "__ssqt_log_type";
export const DEFAULT_LOGGER_NAME = "_ssqt_default_logger";

type Sink = (serializedRecord: string) => void;
const loggers = new Map<string, Logger>();

export function getLogger(logger?: string): Logger {
  const name = logger ?? DEFAULT_LOGGER_NAME;

  if (!loggers.has(name)) {
    initializeLogger(name);
  }

  return loggers.get(name)!;
}

export function isLoggerInitialized(logger?: string): boolean {
  return loggers.has(logger ?? DEFAULT_LOGGER_NAME);
}

export function initializeLogger(
  nameOrConfig?: Partial<LoggerConfig> | string,
  config?: Partial<LoggerConfig>,
): Logger {
  const name =
    typeof nameOrConfig === "string" ? nameOrConfig : DEFAULT_LOGGER_NAME;

  if (loggers.has(name)) {
    throw new Error(`Logger "${name}" has already been initialized`);
  }

  const supplied =
    config ?? (typeof nameOrConfig === "string" ? {} : (nameOrConfig ?? {}));

  const conf: LoggerConfig = { ...defaultConfig(), ...supplied };
  const sinks = conf.transports.map(transportToSink);
  const logger = new Logger(name, sinks, conf.logLevel, {});

  loggers.set(name, logger);
  return logger;
}

export class Logger {
  public name: string;
  public level: LogLevel;

  private sinks: Sink[];
  private baseFields: Record<string, unknown>;

  private collection: {
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

  constructor(
    name: string,
    sinks: Sink[],
    level: LogLevel,
    baseFields: Record<string, unknown>,
  ) {
    this.name = name;
    this.sinks = sinks;
    this.level = level;
    this.baseFields = baseFields;
  }

  public log(
    messageLevel: LogLevel,
    message: unknown,
    fields?: Record<string, unknown>,
  ) {
    if (LOG_LEVEL_VALUES[messageLevel] > LOG_LEVEL_VALUES[this.level]) {
      return;
    }

    let actualMessage = message;
    let messageFields = fields ?? {};
    if (fields === undefined && isRecord(message)) {
      messageFields = message;
      actualMessage = message["message"];
    }

    // per-message fields take precedence over inherited child fields
    const record = formatRecord(this.name, messageLevel, actualMessage, {
      ...this.baseFields,
      ...messageFields,
    });

    if (this.collection.enabled) {
      const index =
        (this.collection.start + this.collection.size) %
        this.collection.maxEntries;

      this.collection.records[index] = record;
      if (this.collection.size < this.collection.maxEntries) {
        this.collection.size += 1;
      } else {
        this.collection.start =
          (this.collection.start + 1) % this.collection.maxEntries;
      }
    }

    if (this.sinks.length > 0) {
      const serializedRecord = `${serializeRecord(record)}\n`;
      for (const sink of this.sinks) {
        sink(serializedRecord);
      }
    }
  }

  public child(record: Record<string, unknown>) {
    return new Logger(this.name, this.sinks, this.level, {
      ...this.baseFields,
      ...record,
    });
  }

  public startLogCollection(options?: LogCollectionOptions) {
    const maxEntries = options?.maxEntries ?? DEFAULT_LOG_COLLECTION_LIMIT;

    if (!Number.isInteger(maxEntries) || maxEntries < 1) {
      throw new Error("Log collection maxEntries must be a positive integer");
    }

    if (this.collection.maxEntries !== maxEntries) {
      const retained = this.getCollectedRecords();
      const records = retained.slice(-maxEntries);
      this.collection.records = records;
      this.collection.start = 0;
      this.collection.size = records.length;
    }

    this.collection.maxEntries = maxEntries;
    this.collection.enabled = true;
  }

  public stopLogCollection() {
    this.collection.enabled = false;
  }

  public getCollectedLogs<T extends boolean = false>(
    opts?: GetCollectedLogsOptions & { serialized?: T },
  ): T extends true ? string : LogRecord[] {
    const records = this.getCollectedRecords();
    if (opts?.serialized) {
      // this is just some type mucking to get the return type to change
      // depending on whether `serialized` is set or not
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      return records.map(serializeRecord).join("\n") as T extends true
        ? string
        : LogRecord[];
    }

    // this is just some type mucking to get the return type to change
    // depending on whether `serialized` is set or not
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    return records as T extends true ? string : LogRecord[];
  }

  public clearCollectedLogs() {
    this.collection.records.length = 0;
    this.collection.start = 0;
    this.collection.size = 0;
  }

  public emerg(message: unknown, fields?: Record<string, unknown>) {
    this.log("emerg", message, fields);
  }

  public alert(message: unknown, fields?: Record<string, unknown>) {
    this.log("alert", message, fields);
  }

  public crit(message: unknown, fields?: Record<string, unknown>) {
    this.log("crit", message, fields);
  }

  public error(message: unknown, fields?: Record<string, unknown>) {
    this.log("error", message, fields);
  }

  public warning(message: unknown, fields?: Record<string, unknown>) {
    this.log("warning", message, fields);
  }

  public warn(message: unknown, fields?: Record<string, unknown>) {
    this.log("warn", message, fields);
  }

  public notice(message: unknown, fields?: Record<string, unknown>) {
    this.log("notice", message, fields);
  }

  public info(message: unknown, fields?: Record<string, unknown>) {
    this.log("info", message, fields);
  }

  public debug(message: unknown, fields?: Record<string, unknown>) {
    this.log("debug", message, fields);
  }

  private getCollectedRecords(): LogRecord[] {
    return Array.from({ length: this.collection.size }, (_unused, index) => {
      return this.collection.records[
        (this.collection.start + index) % this.collection.maxEntries
      ];
    });
  }
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
