import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "widget-components",
  globalScript: "src/global/global.ts",
  buildEs5: true,
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "www",
      serviceWorker: false,
    },
  ],
  plugins: [sass()],
  // extras: {
  //   dynamicImportShim: true,
  //   safari10: true,
  //   shadowDomShim: true,
  //   slotChildNodesFix: true,
  //   appendChildSlotFix: true,
  //   cloneNodeFix: true,
  //   cssVarsShim: true
  // },
};
