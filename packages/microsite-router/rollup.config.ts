import { defineConfig, watch } from "rollup";
import typescript from "@rollup/plugin-typescript";
//@ts-ignore
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/main.ts",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [
    typescript(),
    nodeResolve(),
    ...(process.env.ROLLUP_WATCH
      ? [
          serve({
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }),
        ]
      : [terser()]),
  ],
});
