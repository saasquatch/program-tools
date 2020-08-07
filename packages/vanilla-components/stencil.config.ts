import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "widget-components",
  globalScript: "src/global/global.ts",
  buildEs5: true,
  outputTargets: [
    {
      type: "dist",
      copy: [
        { src: "entrypoint.js" }
      ]
    },
    // {
    //   type: "www",
    //   serviceWorker: false,
    // },
  ],
  plugins: [sass()],
  extras: {
     // Don't use Stencil's built in Safari10 check, it breaks the non-ES modules build
     // NOTE: This looks like it might be fixed in Stencil 1.8.x - https://github.com/ionic-team/stencil/issues/1900
     safari10: false,
     appendChildSlotFix: true,
     cloneNodeFix: true,
     slotChildNodesFix: true
  },
};
