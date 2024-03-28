import { VNode, h } from "@stencil/core";
import { createStyleSheet } from "../../styling/JSS";

interface InvoiceTableViewProps {
  header: string;
  description: string;
}

const style = {
  Description: {
    fontSize: "var(--sl-font-size-small)",
    margin: "0 0 var(--sl-spacing-xx-large)",
    color: "var(--sl-color-gray-500)",
  },
  Header: {
    fontSize: "var(--sl-font-size-large)",
    fontWeight: "var(-sl-font-weight-semibold)",
    margin: "0 0 var(--sl-spacing-xxx-small)",
  },
  Container: {},
  InvoiceTableContaier: {
    "& sl-details::part(base)": {
      border: "none",
    },
    "& sl-details::part(content)": {
      padding: 0,
    },
    "& sl-details::part(header)": {
      fontSize: "var(--sl-font-size-medium)",
      padding: "0px",
    },
    "& sl-details::part(summary)": {
      fontWeight: "var(-sl-font-weight-semibold)",
    },
    "& sl-details::part(summary-icon)": {
      marginRight: "100%",
      marginLeft: "var(--sl-spacing-x-small)",
      transform: "rotate(90deg)",
    },
    "& sl-details[open]::part(summary-icon)": {
      transform: "rotate(270deg)",
    },
  },
};

export function InvoiceTableView(
  props: InvoiceTableViewProps,
  children: VNode
) {
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();

  const vanillaStyle = `
    :host{
      display: block;
    }`;
  return (
    <div class={sheet.classes.Container}>
      <style type="text/css">
        {vanillaStyle}
        {styleString}
      </style>
      <div class={sheet.classes.InvoiceTableContaier}>
        <sl-details summary={props.header}>
          <p class={sheet.classes.Description}>{props.description}</p>
          {children}
        </sl-details>
      </div>
    </div>
  );
}
