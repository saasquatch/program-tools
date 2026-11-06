import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["__tests__/jest-cucumber.ts"],
    setupFiles: ["./vitest.setup.ts"],
    clearMocks: true,
    coverage: {
      provider: "v8",
    },
  },
});
