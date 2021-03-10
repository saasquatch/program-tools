import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import createDocxGenerator from "stencil-docx-docs";

const useDocx = {
  type: "docs-custom",
  generator: createDocxGenerator({
    outDir: "docs",
    textFont: "Calibri",
    excludeTags: ["undocumented"],
    title: "Mint Components",
    author: "SaaSquatch",
  }),
} as const;

export const config: Config = {
  namespace: "components-starter",
  globalScript: "src/global/global.ts",
  buildEs5: true,
  outputTargets:
    //@ts-ignore
    process.env.NODE_ENV === "dev"
      ? [
          {
            type: "dist",
            esmLoaderPath: "../loader",
          },
          {
            type: "www",
            serviceWorker: null, // disable service workers
          },
          useDocx,
        ]
      : //@ts-ignore
      process.env.NODE_ENV === "widget"
      ? [
          {
            type: "dist",
            copy: [{ src: "entrypoint.js" }],
          },
          useDocx,
        ]
      : //@ts-ignore
      process.env.NODE_ENV === "portal"
      ? [
          {
            type: "www",
            copy: [{ src: "entrypoint.js" }],
          },
          useDocx,
        ]
      : [],
  plugins: [sass()],
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
