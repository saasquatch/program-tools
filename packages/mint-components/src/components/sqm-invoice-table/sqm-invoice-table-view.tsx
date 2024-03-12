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
  },
  Header: {
    fontSize: "var(--sl-font-size-large)",
    fontWeight: "var(-sl-font-weight-semibold)",
    margin: "0 0 var(--sl-spacing-xxx-small)",
  },
  Container: {},
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
      <h2 class={sheet.classes.Header}>{props.header}</h2>
      <p class={sheet.classes.Description}>{props.description}</p>
      {children}
    </div>
  );
}
