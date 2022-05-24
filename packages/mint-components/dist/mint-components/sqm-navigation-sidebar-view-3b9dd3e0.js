import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { g as gap } from './mixins-d2de6ff8.js';

const style = {
  ItemsContainer: {
    "min-width": "290px",
    "max-width": "320px",
    "box-sizing": "border-box",
    padding: "20px 15px",
    ...gap({ direction: "column", size: "4px" }),
  },
};
const vanillaStyle = `
  :host{    
    width: 30vw;
    min-width: min-content;
    max-width: 320px;
  }
`;
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function NavigationSidebarView(
// @ts-ignore - Stencil requires props (even if empty)
props, children) {
  return (h("div", null,
    h("div", { class: sheet.classes.ItemsContainer },
      h("style", { type: "text/css" },
        vanillaStyle,
        styleString),
      children)));
}

export { NavigationSidebarView as N };
