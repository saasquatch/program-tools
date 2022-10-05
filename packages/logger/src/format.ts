import winston from "winston";
import { DEFAULT_LOGGER_NAME, LOG_TYPE_MARKER } from "./logger";

/**
 * JSON format logs to be consumed by upstream log processors
 */
export function jsonFormat(name: string): winston.Logform.Format {
  return winston.format.combine(
    winston.format.timestamp(),
    winston.format.splat(),
    addLoggerName(name)(),
    formatHttpLog(),
    dataDogStatus(),
    cleanLogTypeMarker(),
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
    formatHttpLog(),
    dataDogStatus(),
    cleanLogTypeMarker(),
    winston.format.colorize(),
    winston.format.simple(),
    prettyDevFormat
  );
}

/**
 * Human-readable HTTP information to be placed in the
 * `message` field of the log
 */
const friendlyHttpFormat = (message: {
  method: string;
  status: string;
  time: BigInt;
  url: string;
}): string => {
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
  const message = info.message;
  if (info[LOG_TYPE_MARKER] === "HTTP") {
    const micros = Number(info.message.time);
    if (micros < 1000) {
      message.time = `${micros} μs`;
    } else {
      message.time = `${Math.round(micros / 1000)} ms`;
    }

    info.message = friendlyHttpFormat(message);
    info["http.url"] = message.url;
    info["http.method"] = message.method;
    info["http.status_code"] = message.status;
    info["http.response_time"] = message.time;
  }
  return info;
});

/**
 * The `status` field of the JSON is reserved in Datadog for the severity
 * level of the log.
 */
const dataDogStatus = winston.format((info) => {
  info.status = info.level;
  return info;
});

/**
 * Simple human-readable log format
 */
const prettyDevFormat = winston.format.printf((info) => {
  const message = info.message;
  if (typeof message === "object") {
    info.message = JSON.stringify(info.message);
  }

  return `[${info.level}] ${info.message}`;
});

/**
 * If the logger has a custom non-default name, populate the
 * `logger.name` field
 */
const addLoggerName = (name: string) =>
  name !== DEFAULT_LOGGER_NAME
    ? winston.format((info) => {
        info["logger.name"] = name;
        return info;
      })
    : winston.format((info) => info);

/**
 * Clean up the log type marker which is only used for some of the other
 * formatting middleware
 */
const cleanLogTypeMarker = winston.format((info) => {
  delete info[LOG_TYPE_MARKER];
  return info;
});
