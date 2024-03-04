<h1 align="center">@saasquatch/express-boilerplate</h1>

The SaaSquatch shutdown manager package facilitates graceful shutdown behavior across all
NodeJS-based SaaSquatch services.

## Getting Started

Install the package:

```bash
npm install @saasquatch/express-boilerplate
```

Basic usage:

```typescript
import {
  healthCheck,
  installShutdownManager,
  shutdownManagerConfigFromEnv,
} from "@saasquatch/express-boilerplate";

import { initializeLogger } from "@saasquatch/logger";
import express from "express";

const app = express();
const logger = initializeLogger();

app.get("/healthz", healthCheck(app, logger));

const server = installShutdownManager(
  app,
  logger,
  shutdownManagerConfigFromEnv(),
);

server.listen(3000, () => logger.notice("App listening on port 3000"));
```

The `shutdownManagerConfigFromEnv()` function will load the following config options from
environment variables:

| Environment variable             | Config option             | Meaning                                                                                                                                                                      |
| -------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SSQT_HTTP_KEEP_ALIVE_SECONDS`   | `keepAliveTimeoutSeconds` | The number of seconds of inactivity a server needs to wait for additional incoming data, after it has finished writing the last response, before a socket will be destroyed. |
| `SSQT_TERMINATION_DELAY_SECONDS` | `terminationDelaySeconds` | The number of seconds to wait after the shutdown signal is received and before exiting the application process.                                                              |

The options can also be customized directly:

```typescript
const server = installShutdownManager(app, logger, {
  keepAliveTimeoutSeconds: 620,
  terminationDelaySeconds: 20,
});

server.listen(3000, () => logger.notice("App listening on port 3000"));
```

Install hooks:

```typescript
const server = installShutdownManager(app, logger, {
  ...shutdownManagerConfigFromEnv(),

  onSignalReceived: async (signal) =>
    console.log(`"${signal}" signal received!`),

  beforeShutdown: async () => console.log(`HTTP server is about to shut down`),

  afterShutdown: async () => console.log(`HTTP Server has shut down`),
});

server.listen(3000, () => logger.notice("App listening on port 3000"));
```
