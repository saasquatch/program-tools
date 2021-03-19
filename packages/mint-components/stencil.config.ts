import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import createDocxGenerator from "stencil-docx-docs";
import alias from "@rollup/plugin-alias";
import copy from "rollup-plugin-copy";
import css from "rollup-plugin-css-only";
import path from "path";
import { OutputTarget } from "@stencil/core/internal";
import { grapesJsOutput } from "@saasquatch/stencil-grapes-plugin";
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
const copyGrapesJS = {
  src: "../docs/grapesjs.js",
  dest: "grapesjs.js",
  warn: true,
} as const;
const useGrapesjs: OutputTarget = grapesJsOutput({});

const outputTargets: OutputTarget[] = [
  useDocx,
  useGrapesjs,
  {
    type: "dist",
  },
  {
    type: "www",
    serviceWorker: null,
  },
];
export const config: Config = {
  namespace: "mint-components",
  globalScript: "src/global/global.ts",
  globalStyle: "src/global/global.css",
  buildEs5: true,
  outputTargets: outputTargets.filter((t) => {
    if (process.env.BUILD === "DOCS" && t.type !== "docs-custom") {
      // Skipping non-docs in non-docs build
      console.log("Skipping", t.type, "in docs build");
      return false;
    }
    return true;
  }),
  plugins: [sass()],
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
            src: path.resolve(
              __dirname,
              "node_modules/@shoelace-style/shoelace/dist/assets"
            ),
            dest: path.resolve(__dirname, "dist/shoelace"),
          },
        ],
      }),
    ],
  },
  extras: {
    // Don't use Stencil's built in Safari10 check, it breaks the non-ES modules build
    // NOTE: This looks like it might be fixed in Stencil 1.8.x - https://github.com/ionic-team/stencil/issues/1900
    safari10: false,
    appendChildSlotFix: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
  testing: {
    // preset: 'ts-jest',
    moduleNameMapper: {
      haunted: "<rootDir>/__tests__/hacks/haunted.cjs.js",
    },
  },
};

// exports.devServer = {
//   root: 'www',
//   watchGlob: '**/**',
//   httpPort: process.env.PORT || 3333
// };
