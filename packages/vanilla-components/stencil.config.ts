import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
  namespace: "widget-components",
  outputTargets: [
    {
      type: "dist",
    },
    {
      type: "www",
      serviceWorker: false,
    },
  ],
  plugins: [sass()],
};

export const devServer = {
  root: "www",
  watchGlob: "**/**",
  httpPort: process.env.PORT || 3333,
};
