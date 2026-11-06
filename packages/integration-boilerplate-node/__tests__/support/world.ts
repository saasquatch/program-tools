import type http from "node:http";
import {
  setWorldConstructor,
  World,
  Before,
  After,
  BeforeAll,
  AfterAll,
} from "@cucumber/cucumber";
import FakeTimers, { type InstalledClock } from "@sinonjs/fake-timers";
import type { Application } from "express";

import { server as mswServer } from "../../mocks/server.ts";
import { graphqlShouldError } from "../../mocks/graphql.ts";
import type { BaseConfig } from "../../src/index.ts";
import { resetAllMocks } from "./mocks.ts";

// Mock environment for tests — must be set before any scenario creates a service
[
  "SAASQUATCH_AUTH0_CLIENT_ID",
  "SAASQUATCH_AUTH0_SECRET",
  "SAASQUATCH_AUTH0_DOMAIN",
].forEach((e) => (process.env[e] = e));
process.env["SERVER_LOG_LEVEL"] = "debug";
process.env["ENFORCE_HTTPS"] = "false";
process.env["SERVICE_NAME"] = "cucumber-tests";
process.env["SAASQUATCH_APP_DOMAIN"] = "mocked_saasquatch";

export class TestWorld extends World {
  server?: http.Server;
  app: Application | null = null;
  port = 0;
  url = "";
  requestInit: RequestInit = {};
  response?: Response;
  config?: BaseConfig;

  setupService(service: any): Promise<void> {
    return new Promise((resolve) => {
      this.app = service.server;
      this.config = service.config;
      this.server = service.server.listen(() => {
        this.port = (this.server!.address() as any).port;
        resolve();
      });
    });
  }
}

setWorldConstructor(TestWorld);

// The service's workload identity provider reschedules itself with setTimeout
// forever, which would keep the process alive; fake timers neutralize it.
// Only basic timers are faked — faking setImmediate or Date breaks the HTTP
// server/socket lifecycle.
let clock: InstalledClock | undefined;

BeforeAll(function () {
  clock = FakeTimers.install({
    toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"],
  });
  mswServer.listen({ onUnhandledRequest: "bypass" });
});

Before(function () {
  resetAllMocks();
});

After(async function (this: TestWorld) {
  mswServer.resetHandlers();
  graphqlShouldError.flag = false;
  this.app = null;
  this.url = "";
  this.requestInit = {};
  const server = this.server;
  if (server?.listening) {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
      // Don't let lingering keep-alive sockets stall the close
      server.closeAllConnections();
    });
  }
});

AfterAll(function () {
  mswServer.close();
  clock?.uninstall();
});
