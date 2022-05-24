import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function PortalContainerView(props, children) {
  const style = {
    Container: {
      display: props.display || "grid",
      flexWrap: "wrap",
      "grid-template-columns": props.direction === "row"
        ? `repeat(auto-fill, minmax(${props.minWidth}, auto))`
        : "100%",
      "grid-gap": `var(--sl-spacing-${props.gap})`,
      padding: props.padding === "none" ? "0" : `var(--sl-spacing-${props.padding})`,
      maxWidth: props.maxWidth ? props.maxWidth : "",
    },
  };
  const vanillaStyle = `
  :host{
    width: 100%;
    display: block;
  }`;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    children));
}

export { PortalContainerView as P };
