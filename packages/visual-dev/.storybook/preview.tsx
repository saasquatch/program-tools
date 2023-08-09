import type { Preview, StoryFn } from "@storybook/react";
import React from "react";
import { GlobalStyle } from "../src/components/GlobalStyle";
import "@impactinc/ui-component-library/styles"
//@ts-ignore
import { register } from "@impactinc/ui-component-library/web-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

const withGlobalStyles = (Story: StoryFn, context: any) => {
  if (customElements.get("uicl-btn") === undefined) {
    register();
  }
  return (
    <>
      <GlobalStyle />
      <Story {...context} />
    </>
  );
};
export const decorators = [withGlobalStyles];
