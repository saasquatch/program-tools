import { DocsPage, DocsContainer } from "@storybook/addon-docs";
import { GlobalStyle } from "../src/components/GlobalStyle";
import React from "react";

export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    enableShortcuts: false,
  },
  viewMode: "docs",
};

const withGlobalStyles = (Story, context) => {
  return (
    <>
      <GlobalStyle />
      <Story {...context} />
    </>
  );
};
export const decorators = [withGlobalStyles];
