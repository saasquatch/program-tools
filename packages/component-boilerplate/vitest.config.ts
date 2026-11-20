import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // graphql ships both index.mjs and index.js; CJS deps like @graphql-tools
    // require() the latter, so pin it to avoid two graphql realms.
    alias: [{ find: /^graphql$/, replacement: "graphql/index.js" }],
  },
  test: {
    include: ["test/main.ts", "test/canned.test.ts"],
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
