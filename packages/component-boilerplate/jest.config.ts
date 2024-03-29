import type { Config } from "@jest/types";

// uncomment the es stuff if you get errors coming from `node_modules` during
// testing

// const esModules = ["haunted", "lit-html"].join("|");

const config: Config.InitialOptions = {
  testMatch: ["**/test/main.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    // "^.+\\.(ts|tsx|js|jsx)$": "esbuild-jest",
  },
  // transformIgnorePatterns: [`node_modules/(?!(${esModules})/)`]

  // for Mock Service Workers
  setupFilesAfterEnv: ["./jest.setup.ts"],
};

export default config;
