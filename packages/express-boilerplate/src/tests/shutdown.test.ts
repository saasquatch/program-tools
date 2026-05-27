import * as assert from "node:assert";
import { test } from "node:test";
import { shutdownManagerConfigFromEnv } from "../shutdown.ts";

/* eslint-disable @typescript-eslint/no-floating-promises */

test("env parser with env vars", () => {
  process.env["SSQT_HTTP_KEEP_ALIVE_SECONDS"] = "275";
  process.env["SSQT_TERMINATION_DELAY_SECONDS"] = "18";

  const opts = shutdownManagerConfigFromEnv();
  assert.strictEqual(opts.afterShutdown, undefined);
  assert.strictEqual(opts.beforeShutdown, undefined);
  assert.strictEqual(opts.onSignalReceived, undefined);

  assert.strictEqual(opts.keepAliveTimeoutSeconds, 275);
  assert.strictEqual(opts.terminationDelaySeconds, 18);
});

test("env parser with env vars and defaults", () => {
  process.env["SSQT_HTTP_KEEP_ALIVE_SECONDS"] = "";
  process.env["SSQT_TERMINATION_DELAY_SECONDS"] = "18";

  const opts = shutdownManagerConfigFromEnv({
    keepAliveTimeoutSeconds: 123,
    terminationDelaySeconds: 999,
  });

  assert.strictEqual(opts.afterShutdown, undefined);
  assert.strictEqual(opts.beforeShutdown, undefined);
  assert.strictEqual(opts.onSignalReceived, undefined);

  assert.strictEqual(opts.keepAliveTimeoutSeconds, 123);
  assert.strictEqual(opts.terminationDelaySeconds, 18);
});

test("env parser with no env vars and no defaults", () => {
  process.env["SSQT_HTTP_KEEP_ALIVE_SECONDS"] = "";
  process.env["SSQT_TERMINATION_DELAY_SECONDS"] = "";

  const opts = shutdownManagerConfigFromEnv();

  assert.strictEqual(opts.afterShutdown, undefined);
  assert.strictEqual(opts.beforeShutdown, undefined);
  assert.strictEqual(opts.onSignalReceived, undefined);

  assert.strictEqual(opts.keepAliveTimeoutSeconds, 60);
  assert.strictEqual(opts.terminationDelaySeconds, 0);
});
