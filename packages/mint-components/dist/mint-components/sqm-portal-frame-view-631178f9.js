import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { H as HostBlock } from './mixins-d2de6ff8.js';

const style = {
  HostBlock: HostBlock,
  ":host": {
    "min-height": "100vh",
  },
  Frame: {
    "min-height": "100vh",
    display: "flex",
    "flex-direction": "column",
    "box-sizing": "border-box",
  },
  FooterWrapper: {
    width: "100%",
    "max-width": "100%",
    padding: "var(--sl-spacing-medium) var(--sl-spacing-x-large)",
    background: "var(--sqm-footer-background)",
    display: "flex",
    "justify-content": "flex-end",
    "align-items": "center",
    "box-sizing": "border-box",
    "margin-top": "auto",
  },
  HeaderWrapper: {
    width: "100%",
    "max-width": "100%",
    "box-sizing": "border-box",
    display: "flex",
    "justify-content": "space-between",
    padding: "var(--sl-spacing-small) var(--sl-spacing-large)",
    "align-items": "center",
    "background-color": "var(--sqm-header-background)",
    "@media screen and (max-width: 499px)": {
      "flex-direction": "row-reverse",
      "justify-content": "flex-end",
      padding: "0",
    },
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function PortalFrameView(props, children) {
  const { data } = props;
  return (h("div", { class: sheet.classes.Frame },
    h("style", { type: "text/css" }, styleString),
    h("div", { class: sheet.classes.HeaderWrapper },
      data.header,
      h("slot", { name: "sqm-navigation-menu" })),
    children,
    h("div", { class: sheet.classes.FooterWrapper }, data.footer)));
}

export { PortalFrameView as P };
