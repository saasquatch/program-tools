import { h } from "@stencil/core";
import { AddOn } from "@saasquatch/stencilbook";
import { css } from "emotion";

import hljs from "highlight.js/lib/core";
import gherkin from "highlight.js/lib/languages/gherkin";

hljs.registerLanguage("gherkin", gherkin);

const Story = css`
  white-space: pre-line;
  span.hljs-keyword:first-child {
    font-weight: bold;
  }
`;

export const CucumberAddon: AddOn = ({ story }, children) => {
  let code = (story.parent.parameters as any)?.scenario;

  let result;
  try {
    result = hljs.highlight("gherkin", code);
  } catch (e) {
    // No scenario or invalid. Ignoring.
  }

  return (
    <div>
      {result && <pre innerHTML={result.value} class={Story} />}
      {children}
    </div>
  );
};
