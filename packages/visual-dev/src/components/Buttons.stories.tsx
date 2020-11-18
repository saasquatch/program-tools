import { storiesOf } from "@storybook/react";
import React from "react";
import { TextLink } from "./TextButton";

storiesOf("Components / Buttons", module).add("Text Button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink onClick={() => console.log("click")}>This is a text button</TextLink>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Text Button (Blue)", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink blue={true} onClick={() => console.log("click")}>This is a blue text button</TextLink>
    </div>
  );
});