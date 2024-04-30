import { shutdownManagerConfigFromEnv } from "../shutdown";

test("env parser with env vars", () => {
  process.env.SSQT_HTTP_KEEP_ALIVE_SECONDS = "275";
  process.env.SSQT_TERMINATION_DELAY_SECONDS = "18";

  const opts = shutdownManagerConfigFromEnv();
  expect(opts.afterShutdown).toBeUndefined();
  expect(opts.beforeShutdown).toBeUndefined();
  expect(opts.onSignalReceived).toBeUndefined();

  expect(opts.keepAliveTimeoutSeconds).toBe(275);
  expect(opts.terminationDelaySeconds).toBe(18);
});

test("env parser with env vars and defaults", () => {
  process.env.SSQT_HTTP_KEEP_ALIVE_SECONDS = "";
  process.env.SSQT_TERMINATION_DELAY_SECONDS = "18";

  const opts = shutdownManagerConfigFromEnv({
    keepAliveTimeoutSeconds: 123,
    terminationDelaySeconds: 999,
  });

  expect(opts.afterShutdown).toBeUndefined();
  expect(opts.beforeShutdown).toBeUndefined();
  expect(opts.onSignalReceived).toBeUndefined();

  expect(opts.keepAliveTimeoutSeconds).toBe(123);
  expect(opts.terminationDelaySeconds).toBe(18);
});

test("env parser with no env vars and no defaults", () => {
  process.env.SSQT_HTTP_KEEP_ALIVE_SECONDS = "";
  process.env.SSQT_TERMINATION_DELAY_SECONDS = "";

  const opts = shutdownManagerConfigFromEnv();

  expect(opts.afterShutdown).toBeUndefined();
  expect(opts.beforeShutdown).toBeUndefined();
  expect(opts.onSignalReceived).toBeUndefined();

  expect(opts.keepAliveTimeoutSeconds).toBe(60);
  expect(opts.terminationDelaySeconds).toBe(0);
});
