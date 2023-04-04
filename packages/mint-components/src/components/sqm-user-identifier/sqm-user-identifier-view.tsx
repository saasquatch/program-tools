import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface UserIdentifierViewProps {
  userIdentificationText: string;
  switchUserLink: string;
  switchUserText: string;
}

const style = {
  Container: {},
};

const vanillaStyle = `
:host{
  display: inline;   
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function UserIdentifierView(props: UserIdentifierViewProps) {
  const { userIdentificationText, switchUserLink, switchUserText } = props;

  return (
    <span class={sheet.classes.Container}>
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      {userIdentificationText} (<a href={switchUserLink}>{switchUserText}</a>)
    </span>
  );
}
