import { h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface LinkButtonViewProps {
  buttonText?: string;
  onClick: (e: Event) => void;
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

export function LinkButtonView(props: LinkButtonViewProps) {
  const { onClick, buttonText } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <sl-button type={"primary"} exportparts={"base: primarybutton-base"}>
        <a onClick={onClick} class={sheet.classes.Link} part="sqm-link">
          {buttonText}
        </a>
      </sl-button>
    </span>
  );
}
