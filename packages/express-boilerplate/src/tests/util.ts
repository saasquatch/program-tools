import {
  getLogger,
  initializeLogger,
  isLoggerInitialized,
} from "@saasquatch/logger";

export const jestLogger = () => {
  if (isLoggerInitialized("jest-express-boilerplate")) {
    return getLogger("jest-express-boilerplate");
  }

  return initializeLogger("jest-express-boilerplate", {
    logLevel: "crit",
  });
};
