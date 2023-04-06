import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface UserIdentifierViewProps {
  userIdentificationText: string;
  switchUserLink: string;
  switchUserText: string;
}

const style = {
  Container: { color: "var(--sl-color-neutral-600)" },
  Link: {
    textDecoration: "none",
    color: "var(--sl-color-primary-700)",
    "&:hover": {
      color: "var(--sl-color-primary-800)",
    },
  },
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
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      {userIdentificationText} (
      <a class={sheet.classes.Link} href={switchUserLink} part="sqm-link">
        {switchUserText}
      </a>
      )
    </span>
  );
}
