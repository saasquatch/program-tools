import winston from "winston";
import { DEFAULT_LOGGER_NAME, LOG_TYPE_MARKER } from "./logger";

type HTTPMessage = {
  method: string;
  status: string;
  time: BigInt | string;
  url: string;
  requestId?: string;
};

/**
 * JSON format logs to be consumed by upstream log processors
 */
export function jsonFormat(name: string): winston.Logform.Format {
  return winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    addLoggerName(name)(),
    prefixTenantAlias(),
    formatHttpLog(),
    cleanLogTypeMarker(),
    winston.format.uncolorize(),
    dataDogStatus(),
    winston.format.json()
  );
}

/**
 * Human-readable log format for consoles
 */
export function prettyFormat(name: string): winston.Logform.Format {
  return winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    addLoggerName(name)(),
    prefixTenantAlias(),
    formatHttpLog(),
    cleanLogTypeMarker(),
    winston.format.colorize(),
    dataDogStatus(),
    winston.format.simple(),
    prettyDevFormat
  );
}

/**
 * Human-readable HTTP information to be placed in the
 * `message` field of the log
 */
const friendlyHttpFormat = (message: HTTPMessage): string => {
  return [
    message.status,
    message.method,
    message.time.toString().padStart(6, " "),
    message.url,
  ].join(" ");
};

/**
 * Place the HTTP information in the correct
 * fields for Datadog to consume
 */
const formatHttpLog = winston.format((info) => {
  const newInfo = { ...info };
  if (newInfo[LOG_TYPE_MARKER] === "HTTP") {
    // NOTE: it would of course be safer to validate this using a real
    // schema validator like zod, but for a logging library we just
    // don't want that kind of overhead. The HTTP log messages are generated
    // using middleware from our own package so it's unlikely to be invalid
    const message = newInfo.message as any as HTTPMessage;

    const micros = Number(message.time);
    if (micros < 1000) {
      message.time = `${micros} μs`;
    } else {
      message.time = `${Math.round(micros / 1000)} ms`;
    }

    newInfo.message = friendlyHttpFormat(message);
    newInfo["http.url"] = message.url;
    newInfo["http.method"] = message.method;
    newInfo["http.status_code"] = message.status;
    newInfo["http.response_time"] = micros;

    if (message.requestId) {
      newInfo["http.request_id"] = message.requestId;
    }
  }

  return newInfo;
});

/**
 * The `status` field of the JSON is reserved in Datadog for the severity
 * level of the log.
 */
const dataDogStatus = winston.format((info) => {
  return { ...info, status: info.level };
});

/**
 * Simple human-readable log format
 */
const prettyDevFormat = winston.format.printf((info) => {
  const newInfo = { ...info };
  const message = newInfo.message;
  if (typeof message === "object") {
    newInfo.message = JSON.stringify(newInfo.message);
  }

  return `[${newInfo.level}] ${newInfo.message}`;
});

/**
 * If the logger has a custom non-default name, populate the
 * `logger.name` field
 */
const addLoggerName = (name: string) =>
  name !== DEFAULT_LOGGER_NAME
    ? winston.format((info) => ({ ...info, "logger.name": name }))
    : winston.format((info) => info);

const prefixTenantAlias = winston.format((info) => {
  if (
    info["tenantAlias"] &&
    typeof info.message === "string" &&
    !info.message.startsWith(`[${info["tenantAlias"]}]`)
  ) {
    return { ...info, message: `[${info["tenantAlias"]}] ${info.message}` };
  }

  return info;
});

/**
 * Clean up the log type marker which is only used for some of the other
 * formatting middleware
 */
const cleanLogTypeMarker = winston.format((info) => {
  delete info[LOG_TYPE_MARKER];
  return info;
});
