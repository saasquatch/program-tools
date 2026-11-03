import { defineConfig } from "tsup";

// Type declarations are emitted per-file by `tsc -p tsconfig.build.json`
// so consumers can keep deep-importing types from `dist/hooks/...`.
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  platform: "browser",
  target: "es2017",
  sourcemap: true,
  clean: true,
});
