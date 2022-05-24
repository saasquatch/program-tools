import winston from "winston";

import { BaseConfig } from "./config";

export function createLogger<Config extends BaseConfig>(config: Config) {
  return winston.createLogger({
    level: config.serverLogLevel,
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}
