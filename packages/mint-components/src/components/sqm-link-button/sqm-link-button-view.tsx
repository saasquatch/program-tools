import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "neutral"
  | "warning"
  | "danger";
export interface LinkButtonViewProps {
  link: string;
  openInNewTab: boolean;
  buttonType?: ButtonType;
}

const style = {
  Container: { display: "contents" },
  Link: {
    textDecoration: "none",
    color: "inherit",
  },
};

const vanillaStyle = `
:host{
  display: inline;   
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function LinkButtonView(props: LinkButtonViewProps, children: VNode) {
  const { link, openInNewTab, buttonType = "primary" } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <sl-button type={buttonType} exportparts="base: primarybutton-base">
        <a
          class={sheet.classes.Link}
          href={link}
          target={openInNewTab ? "_blank" : "_parent"}
          part="sqm-link"
        >
          {children}
        </a>
      </sl-button>
    </span>
  );
}
