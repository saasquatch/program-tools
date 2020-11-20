import { storiesOf } from "@storybook/react";
import React from "react";
import { H1, P } from "./Typography";
import { WidgetContainer } from "./Widgets";

storiesOf("Components / Widget", module).add("Widget Container", () => {
  return (
    <div style={{ margin: "100px" }}>
      <WidgetContainer>
        <H1>Lorem Ipsum</H1>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </P>
      </WidgetContainer>
    </div>
  );
});
