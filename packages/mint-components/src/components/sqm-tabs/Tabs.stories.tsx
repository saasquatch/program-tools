import { h } from "@stencil/core";

export default {
  title: "Components/Tabs",
};

export const Example = () => (
  <div
    innerHTML={`
     <sqm-tabs>
        <sqm-tab header="hello">Hello World</sqm-tab>
        <sqm-tab header="hello 2">Hello World 2</sqm-tab>
        <sqm-tab header="test">test text</sqm-tab>
    </sqm-tabs>
    `}
  ></div>
);
