import {
  defaultConfig,
  LOG_LEVEL_VALUES,
  type LoggerConfig,
  type LogLevel,
} from "./config.ts";
import { formatRecord, serializeRecord, type LogRecord } from "./format.ts";
import { createSinkWriter, type SinkWriter } from "./stream-sink.ts";

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

export const DEFAULT_LOGGER_NAME = "_ssqt_default_logger";

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
  const sinks = conf.sinks.map((sink) => createSinkWriter(name, sink));
  const logger = new Logger(name, sinks, conf.level, {});

  loggers.set(name, logger);
  return logger;
}

export class Logger {
  public name: string;
  public level: LogLevel;

  private sinks: SinkWriter[];
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
    sinks: SinkWriter[],
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
  ): void {
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
        sink(serializedRecord, messageLevel);
      }
    }
  }

  public async flush(): Promise<void> {
    await Promise.all(
      this.sinks.map((sink) => sink.flush?.() ?? Promise.resolve()),
    );
  }

  public child(record: Record<string, unknown>): Logger {
    return new Logger(this.name, this.sinks, this.level, {
      ...this.baseFields,
      ...record,
    });
  }

  public startLogCollection(options?: LogCollectionOptions): void {
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

  public stopLogCollection(): void {
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

  public clearCollectedLogs(): void {
    this.collection.records.length = 0;
    this.collection.start = 0;
    this.collection.size = 0;
  }

  public emerg(message: unknown, fields?: Record<string, unknown>): void {
    this.log("emerg", message, fields);
  }

  public alert(message: unknown, fields?: Record<string, unknown>): void {
    this.log("alert", message, fields);
  }

  public crit(message: unknown, fields?: Record<string, unknown>): void {
    this.log("crit", message, fields);
  }

  public error(message: unknown, fields?: Record<string, unknown>): void {
    this.log("error", message, fields);
  }

  public warning(message: unknown, fields?: Record<string, unknown>): void {
    this.log("warning", message, fields);
  }

  public warn(message: unknown, fields?: Record<string, unknown>): void {
    this.log("warn", message, fields);
  }

  public notice(message: unknown, fields?: Record<string, unknown>): void {
    this.log("notice", message, fields);
  }

  public info(message: unknown, fields?: Record<string, unknown>): void {
    this.log("info", message, fields);
  }

  public debug(message: unknown, fields?: Record<string, unknown>): void {
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
