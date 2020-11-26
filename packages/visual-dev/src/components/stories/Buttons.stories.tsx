import { storiesOf } from "@storybook/react";
import React from "react";
import { PrimaryButton, PrimaryButtonNew, SecondaryButton } from "../Buttons";
import { TextLink } from "../TextButton";

storiesOf("Components / Buttons", module).add("Text Button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink onClick={() => console.log("click")}>This is a text button</TextLink>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Text Button (Submit Type)", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink type={"submit"} onClick={() => console.log("submitted!")}>This is a text button</TextLink>
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

storiesOf("Components / Buttons", module).add("Primary button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PrimaryButton onClick={() => console.log("click")}>Primary button</PrimaryButton>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Primary button new", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PrimaryButtonNew loading={false} onClick={() => console.log("click")}>Primary button new</PrimaryButtonNew>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Secondary button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <SecondaryButton onClick={() => console.log("click")}>Secondary button</SecondaryButton>
    </div>
  );
});

