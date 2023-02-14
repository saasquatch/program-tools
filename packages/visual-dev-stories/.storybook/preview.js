import { DocsPage, DocsContainer } from "@storybook/addon-docs";
import React from "react";
import { GlobalStyle } from "@saasquatch/visual-dev";

const withGlobalStyles = (Story, context) => {
  return (
    <>
      <GlobalStyle />
      <Story {...context} />
    </>
  );
};
export const decorators = [withGlobalStyles];
