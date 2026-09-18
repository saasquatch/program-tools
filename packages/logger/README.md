<h1 align="center">@saasquatch/logger</h1>
<p align="center">Small structured JSON logger for SaaSquatch Node.js services</p>

This package provides a lightweight structured logger that writes newline-delimited JSON
to stdout by default. It supports syslog-style levels, named loggers, custom writable
stream sinks, temporary log collection to an internal buffer, and Express HTTP logging
middleware.

## Getting started

```bash
npm install @saasquatch/logger
```

```typescript
import { initializeLogger } from "@saasquatch/logger";

const logger = initializeLogger();
logger.info("Hello", { service: "example" });
logger.error(new Error("Something failed"));

const myValue = { field1: "string", field2: 1.2345 };
logger.debug({ message: "Trying to debug something here", myValue });

// child fields are included in every record emitted by the child
const requestLogger = logger.child({ requestId: "req-123" });
requestLogger.info("This log will include the above requestId field");
```

## Customization of log sinks

```typescript
import { createWriteStream } from "node:fs";
import { initializeLogger } from "@saasquatch/logger";

const logger = initializeLogger("my-logger", {
  level: "info",
  sinks: [
    // write to stdout (default)
    { stream: process.stdout },
    // write to stderr
    { stream: process.stderr },
    // write to log file
    { stream: createWriteStream("./service.log") },
  ],
});
```

The supported sink types are `console` and `stream`.

## Temporary log collection

```typescript
import { initializeLogger } from "@saasquatch/logger";

const logger = initializeLogger();

// collect records for a response, while still writing them to the sink
logger.startLogCollection({ maxEntries: 100 });
logger.info("Request finished");

// logs: LogRecord[]
const logs = logger.getCollectedLogs();

// serializedLogs: string
const serializedLogs = logger.getCollectedLogs({ serialized: true });

logger.stopLogCollection();
logger.clearCollectedLogs();
```

Collection mode retains the newest 500 records by default. The size of the collection
buffer can be customized by passing `maxEntries` to the `startLogCollection` function.
Collection is independent for each logger and child logger.

The collected logs can be retrieved either in their raw or serialized form. Specifying
`{ serialized: true }` in the function options will use the logger's built-in
serialization machinery on each collected log, then join the results with newlines.

## Express HTTP logging

```typescript
import express from "express";
import { httpLogMiddleware, initializeLogger } from "@saasquatch/logger";

const app = express();
const logger = initializeLogger();
app.use(httpLogMiddleware(logger));
```

HTTP records include the method, URL, status, response time, and request ID (if present).
Common sensitive URL query parameters are removed by the middleware.
