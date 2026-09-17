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

  // add the logger name field if it's non-default
  if (name !== DEFAULT_LOGGER_NAME) {
    record["logger.name"] = name;
  }

  // Prepend a [<tenantAlias>] tag to the message
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

  // for Datadog
  // https://docs.datadoghq.com/standard-attributes
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

  // for Datadog
  // https://docs.datadoghq.com/standard-attributes?search=HTTP
  record["http.url"] = message.url;
  record["http.method"] = message.method;
  record["http.status_code"] = message.status;
  record["http.response_time"] = micros;

  if (message.requestId) {
    record["http.request_id"] = message.requestId;
  }
}

/**
 * Safely serialize records, including Error and BigInt values.
 */
export function serializeRecord(record: LogRecord): string {
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
