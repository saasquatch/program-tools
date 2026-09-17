<h1 align="center">@saasquatch/logger</h1>
<p align="center">Small structured JSON logger for SaaSquatch NodeJS services</p>

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

// child fields are included in every record emitted by the child
const requestLogger = logger.child({ requestId: "req-123" });
requestLogger.info("Request started");

// collect records for a response, while still writing them to the sink
requestLogger.startLogCollection({ maxEntries: 100 });
requestLogger.info("Request finished");
const logs = requestLogger.getCollectedLogs();
requestLogger.stopLogCollection();
requestLogger.clearCollectedLogs();
```

Collection mode retains the newest 500 records by default. `maxEntries` can be set when
enabling collection; it must be a positive integer. Collection is independent for each
logger and child logger.

Each log call writes one JSON record to each enabled sink. The default minimum level is
`info`; it can also be configured with `SSQT_LOG_LEVEL`.

### Custom stream sinks

Use a writable Node stream in addition to, or instead of, stdout:

```typescript
import { createWriteStream } from "node:fs";
import { initializeLogger } from "@saasquatch/logger";

const logger = initializeLogger({
  transports: [{ type: "stream", stream: createWriteStream("service.log") }],
});
```

The supported transport types are `console` and `stream`.

### Express HTTP logging

```typescript
import express from "express";
import { httpLogMiddleware, initializeLogger } from "@saasquatch/logger";

const app = express();
const logger = initializeLogger();
app.use(httpLogMiddleware(logger));
```

HTTP records include normalized method, URL, status, response time, and request ID
fields. Sensitive URL query parameters are removed by the middleware.
