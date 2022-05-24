import { loadFeatures, autoBindSteps } from "jest-cucumber";

import steps from "./steps";

// Something in the tests is leaking, and I can't figure out what it is. It looks like something is leaking file
// descriptors for stdout, stderr and stdin (discovered by using the leaked-handles package and lsof), but weirdly
// using fake timers fixes the issue and Jest exits without issue. Initially I suspected Winston was leaking given
// the file descriptors, but I pulled it out with no change.  Maybe come back to this at some point to figure it out.
jest.useFakeTimers();

// Mock environment for tests
[
  "SAASQUATCH_AUTH0_CLIENT_ID",
  "SAASQUATCH_AUTH0_SECRET",
  "SAASQUATCH_AUTH0_DOMAIN",
].forEach((e) => (process.env[e] = e));
process.env["SERVER_LOG_LEVEL"] = "none";
process.env["ENFORCE_HTTPS"] = "false";
process.env["SAASQUATCH_APP_DOMAIN"] = "mocked_saasquatch";

const features = loadFeatures("__tests__/features/**/*.feature");
autoBindSteps(features, steps);
