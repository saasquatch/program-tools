import { h, VNode } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

export const style = {
  Description: {
    "& input[type=checkbox]": {
      display: "none",
    },
    "& input:checked ~ .details": {
      transform: "rotate(-180deg)",
    },
    "& .details": {
      position: "absolute",
      top: "var(--sl-spacing-medium)",
      right: "var(--sl-spacing-medium)",
      color: "var(--sl-color-neutral-700)",
      fontSize: "var(--sl-font-size-large)",
      "& :hover": {
        color: "var(--sl-color-primary-700)",
      },
      transformOrigin: "50% 37%",
      transition: "transform var(--sl-transition-medium) ease",
      cursor: "pointer",
    },
    "& input:checked ~ .summary": {
      transition: "all var(--sl-transition-medium) ease",
      maxHeight: "300px",
      marginBottom: "var(--sl-spacing-x-large)",
    },
    "& input:checked ~ .summary[progress-bar]": {
      marginBottom: "var(--sl-spacing-xx-large)",
    },
    "& .summary": {
      display: "block",
      overflow: "hidden",
      fontSize: "var(--sl-font-size-small)",
      maxHeight: "0px",
      transition: "all var(--sl-transition-fast) ease-out",
      marginBottom: "var(--sl-spacing-medium)",
    },
  },
};

const sheet = createStyleSheet(style);
const styleString = sheet.toString();

export function Details(props): VNode {
  const rid = Math.random().toString(36).slice(2);

  return (
    <div style={{ opacity: props.opacity }}>
      <style type="text/css">{styleString}</style>
      <span class={sheet.classes.Description}>
        <input type="checkbox" id={"details-" + rid} />
        <label class="details" htmlFor={"details-" + rid}>
          <sl-icon name="chevron-down"></sl-icon>
        </label>
        <span class="summary" progress-bar={props.progressBar}>
          {props.content.description}
        </span>
      </span>
    </div>
  );
}
