import { asyncHandlerWrapper } from "./async-wrapper";
import type { GenericError } from "./error";
import { formatGenericError } from "./error";
import { healthCheck } from "./healthcheck";
import { requestIdAndLogger } from "./middleware";
import { nanoid } from "./nanoid";
import type { ShutdownManagerConfig } from "./shutdown";
import {
  installShutdownManager,
  shutdownManagerConfigFromEnv,
} from "./shutdown";

export {
  asyncHandlerWrapper,
  formatGenericError,
  healthCheck,
  installShutdownManager,
  nanoid,
  requestIdAndLogger,
  shutdownManagerConfigFromEnv,
};
export type { GenericError, ShutdownManagerConfig };
