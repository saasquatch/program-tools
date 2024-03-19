import { Application } from "express";
import { Server, createServer } from "http";
import { Logger } from "winston";
import { formatGenericError } from "./error";

const handleHookError = (hook: string, logger: Logger) => (err: unknown) => {
  logger.error({
    message: `Error ocurred inside shutdown-manager ${hook} hook`,
    ...formatGenericError(err),
  });
};

// these should be kept opaque to consumers of the library. manipulating
// these variables outside the library can result in unwanted behavior.
export const TERMINATION_APP_LOCAL_KEY = "__ssqt_terminating";
export const INSTALLATION_APP_LOCAL_KEY = "__ssqt_shutdown_manager_installed";

export type ShutdownManagerConfig = {
  keepAliveTimeoutSeconds: number;
  terminationDelaySeconds: number;
  onSignalReceived?: (signal: string) => Promise<void>;
  beforeShutdown?: () => Promise<void>;
  afterShutdown?: () => Promise<void>;
};

export function shutdownManagerConfigFromEnv(
  defaults?: Partial<ShutdownManagerConfig>,
): ShutdownManagerConfig {
  const optionalInt = (key: string, defaultVal: number): number => {
    const env = process.env[key];
    if (!env) {
      return defaultVal;
    }

    const parsedEnv = parseInt(env, 10);
    if (Number.isNaN(parsedEnv)) {
      throw new Error(`Environment variable "${key}" is not an integer`);
    }
    return parsedEnv;
  };

  const keepAliveTimeoutSeconds = optionalInt(
    "SSQT_HTTP_KEEP_ALIVE_SECONDS",
    defaults?.keepAliveTimeoutSeconds ?? 60,
  );

  const terminationDelaySeconds = optionalInt(
    "SSQT_TERMINATION_DELAY_SECONDS",
    defaults?.terminationDelaySeconds ?? 0,
  );

  return {
    keepAliveTimeoutSeconds,
    terminationDelaySeconds,
  };
}

/**
 * Install the signal handlers and graceful shutdown logic
 * into the application.
 */
export function installShutdownManager(
  app: Application,
  logger: Logger,
  config: ShutdownManagerConfig,
): Server {
  app.disable("x-powered-by");
  const server = createServer(app);

  // eslint-disable-next-line -- @typescript-eslint/no-unsafe-assignment
  const shutdownManagerInstalled = app.locals[INSTALLATION_APP_LOCAL_KEY];

  if (
    typeof shutdownManagerInstalled === "boolean" &&
    shutdownManagerInstalled
  ) {
    throw new Error("Shutdown manager can only be installed once");
  }

  app.locals[INSTALLATION_APP_LOCAL_KEY] = true;

  // https://cloud.google.com/load-balancing/docs/https/https-logging-monitoring#failure-messages
  // (see the section on backend_connection_closed_before_data_sent_to_client)
  server.keepAliveTimeout = config.keepAliveTimeoutSeconds * 1000;
  server.headersTimeout = (config.keepAliveTimeoutSeconds + 1) * 1000;

  const gracefulShutdown = (signal: string) => () => {
    // eslint-disable-next-line -- @typescript-eslint/no-unsafe-assignment
    const isTerminating = app.locals[TERMINATION_APP_LOCAL_KEY];

    if (typeof isTerminating === "boolean" && isTerminating) {
      logger.warn(
        "Server is already in TERMINATING state, not starting shutdown procedure again",
      );
      return;
    }

    app.locals[TERMINATION_APP_LOCAL_KEY] = true;

    logger.notice(`Received ${signal} signal, starting shutdown procedure`);

    const shutdown = () => {
      setTimeout(() => {
        const closeServer = () => {
          server.close(() => {
            logger.notice("Server closed");

            if (config.afterShutdown) {
              logger.debug(
                "afterShutdown hook is present, executing before shutting down",
              );
              config
                .afterShutdown()
                .catch(handleHookError("afterShutdown", logger))
                .finally(() => process.exit(0));
            }
          });
        };

        if (config.beforeShutdown) {
          config
            .beforeShutdown()
            .catch(handleHookError("beforeShutdown", logger))
            .finally(() => {
              closeServer();
            });
        } else {
          closeServer();
        }
      }, config.terminationDelaySeconds * 1000);
    };

    if (config.onSignalReceived) {
      logger.debug(
        "onSignalReceived hook is present, executing before shutting down",
      );

      config
        .onSignalReceived(signal)
        .catch(handleHookError("onSignalReceived", logger))
        .finally(() => {
          shutdown();
        });
    } else {
      shutdown();
    }
  };

  process.on("SIGTERM", gracefulShutdown("SIGTERM"));
  process.on("SIGINT", gracefulShutdown("SIGINT"));

  return server;
}
