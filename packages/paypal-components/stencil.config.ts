import plugin from "@raisins/stencil-docs-target";
import alias from "@rollup/plugin-alias";
import { grapesJsOutput } from "@saasquatch/stencil-grapes-plugin";
import { Config } from "@stencil/core";
import { OutputTarget } from "@stencil/core/internal";
import { sass } from "@stencil/sass";
import path from "path";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import { string } from "rollup-plugin-string";
import { ShoelaceComponents } from "./shoelace-definitions";

const useGrapesjs: OutputTarget = grapesJsOutput({
  outDir: "grapesjs",
  components: ShoelaceComponents,
});

export const config: Config = {
  namespace: "paypal-components",
  devServer: {
    // startupTimeout: 0,
  },
  globalScript: "src/global/global.ts",
  globalStyle: "src/global/global.css",
  buildEs5: true,
  bundles: [
    {
      components: [
        "sqp-status-column",
        "sqp-status-cell",
        "sqp-rewards-column",
        "sqp-rewards-cell",
        "sqp-account-details",
      ],
    },
  ],
  outputTargets:
    //@ts-ignore
    process.env.NODE_ENV === "dev"
      ? [
          {
            type: "dist",
          },
          {
            type: "www",
            serviceWorker: null, // disable service workers
            copy: [{ src: "global/styles.ts" }],
          },
          useGrapesjs,
          plugin({
            outDir: "docs",
          }),
        ]
      : [
          {
            type: "dist",
            copy: [{ src: "global/styles.ts" }],
          },
          {
            type: "stats",
            file: "docs/stats.json", // optional
          },
          plugin({
            outDir: "docs",
          }),
          useGrapesjs,
        ],
  plugins: [
    sass({ injectGlobalPaths: ["src/global/mixins.scss"] }),
    string({ include: "**/*.feature" }),
    string({ include: "**/*.md" }),
  ],
  rollupPlugins: {
    before: [
      alias({
        entries: [
          {
            find: "@saasquatch/universal-hooks",
            replacement: path.resolve(
              __dirname,
              "node_modules",
              "@saasquatch/stencil-hooks"
            ),
          },
        ],
      }),
      css({
        output: "bundle.css",
      }),
      copy({
        targets: [
          {
            src: "node_modules/@saasquatch/shoelace/dist/assets",
            dest: "shoelace",
          },
          {
            src: "node_modules/@saasquatch/shoelace/dist/themes",
            dest: "shoelace/themes",
          },
        ],
      }),
      string({ include: "src/templates/*.html" }),
    ],
  },
  extras: {
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
};
