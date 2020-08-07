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
     safari10: false,
     appendChildSlotFix: true,
     //slotChildNodesFix: true,
     cloneNodeFix: true,
  },
};
