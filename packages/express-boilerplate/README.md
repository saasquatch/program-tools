<h1 align="center">@saasquatch/express-boilerplate</h1>

The SaaSquatch exporess boilerplate package provides a number of middleware and utility
functions that are useful in Express apps, particularly those running in Kubernetes
environments.

## Getting Started

Install the package:

```bash
npm install @saasquatch/express-boilerplate
```

## Basic usage:

```typescript
import {
  healthCheck,
  installShutdownManager,
  requestIdAndLogger,
  shutdownManagerConfigFromEnv,
} from "@saasquatch/express-boilerplate";

import { httpLogMiddleware, initializeLogger } from "@saasquatch/logger";
import express from "express";

const app = express();
const baseLogger = initializeLogger();

app.use(requestIdAndLogger(baseLogger));
app.use(httpLogMiddleware(baseLogger));
app.get("/healthz", healthCheck(app, baseLogger));

const server = installShutdownManager(
  app,
  baseLogger,
  shutdownManagerConfigFromEnv(),
);

server.listen(3000, () => baseLogger.notice("App listening on port 3000"));
```

## Graceful Shutdown Manager

The `installShutdownManager` function installs the OS signal handlers for `SIGINT` and
`SIGTERM` to shutdown the server in a graceful way that is compatible with Kubernetes
best practices. It is also used to configure the TCP Keep-Alive timeouts for the server,
which may be necessary for certain cloud load balancers.

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

The shutdown manager also supports executing hook functions when certain events occur
during the shutdown process:

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

## RequestId and Logger Middleware

The `requestIdAndLogger` middleware function generates a random request ID using `nanoid`
and sets the `res.locals.requestId` and `res.locals.logger` variables. These can be used
in the subsequent request handlers to generate log events with the requestId
automatically attached.

```typescript
const baseLogger = initializeLogger();
app.use(requestIdAndLogger(baseLogger));

app.get("/testing", (req, res) => {
  const logger = res.locals.logger;
  const requestId = res.locals.requestId;

  logger.info(`The requestId is: ${requestId}`);

  // produces log event with { "requestId": "XXXXXXXXXXXX" } as a field
  logger.info("Inside the /testing request handler!");
});
```

## Async request handler wrapper

The `asyncHandlerWrapper` function wraps an async request handler to automatically catch
any rejected promises, log the error, and return an appropriate response. Without this
function the default behavior is for unhandled promise rejections to crash the
application, which is obviously unwanted.

This function requires that the `requestIdAndLogger` middleware function is installed.

```typescript
import {
  asyncHandlerWrapper,
  requestIdAndLogger,
} from "@saasquatch/express-boilerplate";

app.use(requestIdAndLogger(baseLogger));

// BAD -- promise rejection in getSomethingFromTheDatabase will crash
// the application
app.get("/testing", async (req, res) => {
  const dbResults = await getSomethingFromTheDatabase();
  res.status(200).json(dbResults);
});

// OK -- promise rejection in getSomethingFromTheDatabase will be handled by
// the wrapper and return an appropriate 500 response
app.get(
  "/testing",
  asyncHandlerWrapper(async (req, res) => {
    const dbResults = await getSomethingFromTheDatabase();
    res.status(200).json(dbResults);
  }),
);
```

## nanoid re-export

The library exports a `nanoid` function, which is just vanilla `nanoid` with a custom
alphabet of characters that are a bit easier to read. Its default ID length is 32.

```typescript
import { nanoid } from "@saasquatch/express-boilerplate";

console.log(nanoid());
console.log(nanoid(12));
```
