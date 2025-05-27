import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import createDocxGenerator from "stencil-docx-docs";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import path from "path";
import { OutputTarget } from "@stencil/core/internal";
import { grapesJsOutput } from "@saasquatch/stencil-grapes-plugin";
import { ShoelaceComponents } from "./shoelace-definitions";
import { string } from "rollup-plugin-string";
import plugin from "@raisins/stencil-docs-target";

const useDocx: OutputTarget = {
  type: "docs-custom",
  generator: createDocxGenerator({
    outDir: "docs",
    textFont: "Calibri",
    excludeTags: ["undocumented"],
    title: "Mint Components",
    author: "SaaSquatch",
  }),
} as const;
const useGrapesjs: OutputTarget = grapesJsOutput({
  outDir: "grapesjs",
  components: ShoelaceComponents,
});

export const config: Config = {
  namespace: "mint-components",
  devServer: {
    // startupTimeout: 0,
  },
  globalScript: "src/global/global.ts",
  globalStyle: "src/global/global.css",
  buildEs5: true,
  bundles: [
    {
      components: [
        "sqm-referral-table",
        "sqm-referral-table-column",
        "sqm-referral-table-date-column",
        "sqm-referral-table-rewards-column",
        "sqm-referral-table-status-column",
        "sqm-referral-table-user-column",
        "sqm-referral-table-cell",
        "sqm-referral-table-date-cell",
        "sqm-referral-table-rewards-cell",
        "sqm-referral-table-status-cell",
        "sqm-referral-table-user-cell",
      ],
    },
    {
      components: [
        "sqm-rewards-table",
        "sqm-rewards-table-date-column",
        "sqm-rewards-table-reward-column",
        "sqm-rewards-table-source-column",
        "sqm-rewards-table-status-column",
        "sqm-rewards-table-date-cell",
        "sqm-rewards-table-reward-cell",
        "sqm-rewards-table-source-cell",
        "sqm-rewards-table-status-cell",
      ],
    },
    {
      components: ["sqm-referral-code", "sqm-referral-codes", "sqm-pagination"],
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
          useDocx,
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
          useDocx,
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
