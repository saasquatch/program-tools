import { h } from "@stencil/core";
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
  buttonText?: string;
  onClick?: (e: Event) => void;
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
  const {
    onClick,
    link,
    openInNewTab,
    buttonType = "primary",
    buttonText,
  } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <sl-button
        type={buttonType}
        exportparts={`base: ${buttonType}button-base`}
      >
        <a onClick={onClick} class={sheet.classes.Link} part="sqm-link">
          {buttonText}
        </a>
      </sl-button>
    </span>
  );
}
