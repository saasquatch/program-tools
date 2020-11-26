import { storiesOf } from "@storybook/react";
import React from "react";
import { P, WidgetTitle } from "../Typography";
import { WidgetContainer } from "../Layouts";

storiesOf("Components / Widget", module).add("Widget Container", () => {
  return (
    <div style={{ margin: "100px" }}>
      <WidgetContainer>
        <WidgetTitle>Lorem Ipsum</WidgetTitle>
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
