import { storiesOf } from "@storybook/react";
import React from "react";
import { PlatformSignInButton, PrimaryButton, PrimaryButtonNew, SecondaryButton } from "../Buttons";
import { TextLink } from "../TextButton";

const fake = async () => {
  Promise.resolve(console.log('click'))
}

storiesOf("Components / Buttons", module).add("Text Button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink onClick={fake}>This is a text button</TextLink>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Text Button (Submit Type)", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink type={"submit"} onClick={fake}>This is a text button</TextLink>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Text Button (Blue)", () => {
  return (
    <div style={{ margin: "100px" }}>
      <TextLink blue={true} onClick={fake}>This is a blue text button</TextLink>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Primary button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PrimaryButton onClick={fake}>Primary button</PrimaryButton>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Primary button new", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PrimaryButtonNew loading={false} onClick={fake}>Primary button new</PrimaryButtonNew>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Secondary button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <SecondaryButton onClick={fake}>Secondary button</SecondaryButton>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Sign in button", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PlatformSignInButton onClick={fake}>Secondary button</PlatformSignInButton>
    </div>
  );
});

storiesOf("Components / Buttons", module).add("Sign in button with color", () => {
  return (
    <div style={{ margin: "100px" }}>
      <PlatformSignInButton bgcolor={"#0C9CD9"} hoverBGColor={"#0088CC"} onClick={fake}>Secondary button</PlatformSignInButton>
    </div>
  );
});

