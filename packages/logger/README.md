<h1 align="center">@saasquatch/logger</h1>
<p align="center">Thin wrapper around Winston to provide unified logging across SaaSquatch NodeJS services</p>
<p align="center">
  <a href="https://www.npmjs.com/package/@saasquatch/logger"><img src="https://img.shields.io/npm/v/@saasquatch/logger/latest.svg?style=flat-square" alt="NPM version" /> </a>
  <a href="https://www.npmjs.com/package/@saasquatch/logger"><img src="https://img.shields.io/npm/dm/@saasquatch/logger.svg?style=flat-square" alt="NPM downloads"/> </a>
</p>

The SaaSquatch logging package facilitates unified structured logging across all
NodeJS-based SaaSquatch services. It wraps Winston and provides standard log formats for
general logging, debugging, and HTTP services.

## Getting Started

Install the package from NPM:

```bash
npm install @saasquatch/logger
```

Basic usage:

```typescript
import { initializeLogger, getLogger } from "@saasquatch/logger";

function main() {
  const logger = initializeLogger();

  logger.info("Hello");
  otherFunction();
}

function otherFunction() {
  getLogger()!.info("World!");
}

main();
```

Express HTTP logging middleware:

```typescript
import express from "express";
import { httpLogMiddleware, initializeLogger } from "@saasquatch/logger";

const server = express();
const logger = initializeLogger();
server.use(httpLogMiddleware(logger));
```
