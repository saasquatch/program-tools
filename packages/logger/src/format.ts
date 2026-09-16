import type { LogLevel } from "./config.ts";
import { DEFAULT_LOGGER_NAME, LOG_TYPE_MARKER } from "./logger.ts";

type HTTPMessage = {
  method: string;
  status: string | number;
  time: bigint | string | number;
  url: string;
  requestId?: string;
};

export type LogRecord = Record<string, unknown> & {
  level: LogLevel;
  timestamp: string;
};

/** Build the JSON record emitted by the logger. */
export function formatRecord(
  name: string,
  level: LogLevel,
  message: unknown,
  fields: Record<string, unknown> = {},
): LogRecord {
  const record: LogRecord = {
    ...fields,
    level,
    timestamp: new Date().toISOString(),
    message,
  };

  if (name !== DEFAULT_LOGGER_NAME) {
    record["logger.name"] = name;
  }

  if (
    typeof record["tenantAlias"] === "string" &&
    typeof record["message"] === "string"
  ) {
    const tenantAliasTag = `[${record["tenantAlias"]}]`;
    if (!record["message"].startsWith(tenantAliasTag)) {
      record["message"] = `${tenantAliasTag} ${record["message"]}`;
    }
  }

  if (record[LOG_TYPE_MARKER] === "HTTP") {
    formatHttpRecord(record);
  }

  delete record[LOG_TYPE_MARKER];
  record["status"] = level;

  return record;
}

function formatHttpRecord(record: Record<string, unknown>): void {
  const value = record["message"];
  if (value === null || typeof value !== "object") {
    return;
  }

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  const message = value as HTTPMessage;
  const micros = Number(message.time);
  const displayTime =
    micros < 1000 ? `${micros} μs` : `${Math.round(micros / 1000)} ms`;

  record["message"] = [
    message.status,
    message.method,
    displayTime.padStart(6, " "),
    message.url,
  ].join(" ");

  record["http.url"] = message.url;
  record["http.method"] = message.method;
  record["http.status_code"] = message.status;
  record["http.response_time"] = micros;

  if (message.requestId) {
    record["http.request_id"] = message.requestId;
  }
}

/** Safely serialize records, including Error and BigInt values. */
export function serializeRecord(record: LogRecord): string {
  // Keep only the current ancestor chain. A WeakSet of every object seen in
  // the record would incorrectly classify valid shared sibling references as
  // circular.
  const ancestors: object[] = [];
  return JSON.stringify(record, function (_key, value: unknown) {
    if (typeof value === "bigint") {
      return value.toString();
    }

    if (value instanceof Error) {
      return { name: value.name, message: value.message, stack: value.stack };
    }

    if (typeof value === "object" && value !== null) {
      while (ancestors.length > 0 && ancestors[ancestors.length - 1] !== this) {
        ancestors.pop();
      }

      if (ancestors.includes(value)) {
        return "[Circular]";
      }

      ancestors.push(value);
    }
    return value;
  });
}
