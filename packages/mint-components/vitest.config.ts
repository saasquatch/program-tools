import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
    exclude: ["src/**/*.e2e.ts", "node_modules"],
    globals: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "src/**/*.spec.ts",
        "src/**/*.test.ts",
        "src/**/*.e2e.ts",
        "src/**/*.d.ts",
        "src/components.d.ts",
        "src/**/stories/**",
        "src/**/*.stories.*",
      ],
    },
  },
});
