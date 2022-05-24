import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function BigStatView(props, children) {
  const { statvalue, flexReverse, alignment } = props;
  const style = {
    Container: {
      display: "flex",
      height: "inherit",
      "justify-content": "space-between",
      "flex-direction": `${flexReverse ? "column-reverse" : "column"}`,
      "align-items": `${alignment === "left"
        ? "flex-start"
        : alignment === "right"
          ? "flex-end"
          : "center"}`,
    },
    Stat: {
      "font-size": "var(--sl-font-size-x-large)",
      "text-align": alignment,
    },
    Description: {
      "font-size": "var(--sl-font-size-small)",
      "font-weight": "var(--sl-font-weight-normal)",
      color: "var(--sl-color-gray-600)",
      "text-transform": "uppercase",
      "text-align": alignment,
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", { part: "stat-wrapper", class: sheet.classes.Container },
    h("style", { type: "text/css" }, styleString),
    h("div", { part: "stat-value", class: sheet.classes.Stat }, statvalue),
    h("div", { part: "stat-description", class: sheet.classes.Description }, children)));
}

export { BigStatView as B };
