import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts"],
  format: ["esm"],
  platform: "browser",
  inputOptions: { platform: "browser" },
  target: "es2017",
  fixedExtension: true,
  dts: true,
  sourcemap: true,
});
