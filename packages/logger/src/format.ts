import type { LogLevel } from "./config.ts";
import { DEFAULT_LOGGER_NAME } from "./logger.ts";

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

  // prepend a [<tenantAlias>] tag to the message
  if (
    record["tenantAlias"] &&
    typeof record["tenantAlias"] === "string" &&
    typeof record["message"] === "string"
  ) {
    const tenantAliasTag = `[${record["tenantAlias"]}]`;
    if (!record["message"].startsWith(tenantAliasTag)) {
      record["message"] = `${tenantAliasTag} ${record["message"]}`;
    }
  }

  // for Datadog
  // https://docs.datadoghq.com/standard-attributes
  record["status"] = level;

  return record;
}

/**
 * Safely serialize records, including Error and BigInt values.
 */
export function serializeRecord(record: LogRecord): string {
  const ancestors: object[] = [];
  return JSON.stringify(
    { ...record, toJSON: undefined },
    function(_key, value: unknown) {
      if (typeof value === "bigint") {
        return value.toString();
      }

      if (value instanceof Error) {
        return { name: value.name, message: value.message, stack: value.stack };
      }

      if (typeof value === "object" && value !== null) {
        while (
          ancestors.length > 0 &&
          ancestors[ancestors.length - 1] !== this
        ) {
          ancestors.pop();
        }

        if (ancestors.includes(value)) {
          return "[Circular]";
        }

        ancestors.push(value);
      }
      return value;
    },
  );
}
