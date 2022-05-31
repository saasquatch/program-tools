import { defineConfig, watch } from "rollup";
import typescript from "@rollup/plugin-typescript";
//@ts-ignore
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

const buildPlugins = [typescript, terser];
const watchPlugins = [typescript, serve];
const plugins = process.env.ROLLUP_WATCH ? watchPlugins : buildPlugins;

export default defineConfig({
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: plugins.map((f) => f()),
});
