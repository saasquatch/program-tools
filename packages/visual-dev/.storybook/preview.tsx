import type { Preview, StoryFn } from "@storybook/react";
import React from "react";
import { GlobalStyle } from "../src/components/GlobalStyle";
import "@impactinc/ui-component-library/styles"

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
  return (
    <>
      <GlobalStyle />
      <Story {...context} />
    </>
  );
};
export const decorators = [withGlobalStyles];
