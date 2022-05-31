import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
//@ts-ignore
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";

export default defineConfig({
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [typescript(), terser(), serve()],
});
