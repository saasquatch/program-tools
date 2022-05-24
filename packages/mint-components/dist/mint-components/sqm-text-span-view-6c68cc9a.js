import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function TextSpanView(props, children) {
  const style = {
    p: {
      "font-size": "var(--sl-font-size-small)",
      "font-weight": "400",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    subtext: {
      "font-size": "var(--sl-font-size-x-small)",
      "font-weight": "400",
      color: "var(--sl-color-gray-600)",
      margin: "0",
    },
    h1: {
      "font-size": "var(--sl-font-size-xx-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h2: {
      "font-size": "var(--sl-font-size-x-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h3: {
      "font-size": "var(--sl-font-size-large)",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
    h4: {
      "font-size": "13px",
      "font-weight": "600",
      color: "var(--sl-color-gray-800)",
      margin: "0",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
    sqm-text-span {
      display: inline;
    }
  `;
  return (h("span", { class: sheet.classes[props.type] },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    children));
}

export { TextSpanView as T };
