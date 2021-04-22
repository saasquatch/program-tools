import { Config } from "@stencil/core";
import { grapesJsOutput } from "../dist/generator";
export const config: Config = {
  namespace: "grapes-test",
  outputTargets: [
    {
      type: "dist",
    },
    {
      type: "dist-custom-elements-bundle",
    },
    {
      type: "docs-readme",
    },
    {
      type: "docs-json",
      file: "docs.json",
    },
    grapesJsOutput({}),
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
};
