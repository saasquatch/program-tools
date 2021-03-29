import { Config } from "@stencil/core";
import { grapesJsOutput } from "../";
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
      file: "docs/docs.json",
    },
    grapesJsOutput({
      components: [
        {
          tag: "eg-thing",
          name: "Example THing",
          traits: [
            {
              type: "string",
              title: "my-attr",
              name: "my-attr",
            },
          ],
          uiSchema: {
            "ui:widget": "TextFancy",
          },
        },
      ],
    }),
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
};
