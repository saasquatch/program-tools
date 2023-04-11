import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface LinkButtonViewProps {
  link: string;
  openInNewTab: boolean;
}

const style = {
  Container: { display: "contents" },
};

const vanillaStyle = `
:host{
  display: inline;   
}
`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function LinkButtonView(props: LinkButtonViewProps) {
  const { link, openInNewTab } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <sl-button exportparts="base: primarybutton-base">
        <a href={link} target={openInNewTab ? "_blank" : ""} part="sqm-link">
          <slot />
        </a>
      </sl-button>
    </span>
  );
}
