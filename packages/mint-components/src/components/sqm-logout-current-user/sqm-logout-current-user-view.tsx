import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export interface LogoutCurrentUserViewProps {
  loading: boolean;
  emailErrorText: string;
  filledInEmailText: string;
  onSwitchClick: () => void;
  switchUserText: string;
}

const style = {
  Container: { display: "flex", color: "var(--sl-color-neutral-600)" },
  Text: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  Link: {
    textDecoration: "none",
    color: "var(--sl-color-primary-700)",
    cursor: "pointer",
    "&:hover": {
      color: "var(--sl-color-primary-800)",
    },
  },
};

const vanillaStyle = `
:host, sqm-logout-current-user{
  display: inline;   
}

`;

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function LogoutCurrentUserView(props: LogoutCurrentUserViewProps) {
  const {
    loading,
    filledInEmailText,
    onSwitchClick,
    switchUserText,
    emailErrorText,
  } = props;

  return (
    <span class={sheet.classes.Container} part="sqm-base">
      <style type="text/css">
        {styleString}
        {vanillaStyle}
      </style>
      <span class={sheet.classes.Text}>
        {loading ? "..." : filledInEmailText || emailErrorText}
      </span>{" "}
      (
      <span class={sheet.classes.Link} onClick={onSwitchClick} part="sqm-link">
        {switchUserText}
      </span>
      )
    </span>
  );
}
