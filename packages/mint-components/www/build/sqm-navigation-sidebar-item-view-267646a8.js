import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { g as gap } from './mixins-d2de6ff8.js';
import { b as dn } from './index.module-b74a7f69.js';

function NavigationSidebarItemView(props) {
  const { states, data } = props;
  const style = {
    ItemContainer: {
      display: "flex",
      "background-color": `${states.active ? "var(--sl-color-gray-200)" : "var(--sl-color-white)"}`,
      "border-radius": "8px",
      padding: "8px",
      "text-decoration": "none",
      color: "#454444",
      "align-items": "center",
      ...gap({ direction: "row", size: "var(--sl-font-size-small)" }),
      "&:hover": {
        cursor: "pointer",
        background: states.active
          ? "var(--sl-color-gray-300)"
          : "var(--sl-color-gray-50)",
      },
    },
    Label: {
      margin: "0",
    },
    Icon: {
      "flex-shrink": "0",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("a", { href: data.path, onClick: (e) => {
      e.preventDefault();
      dn.push(data.path);
    }, class: sheet.classes.ItemContainer },
    h("style", { type: "text/css" }, styleString),
    h("sl-icon", { class: sheet.classes.Icon, name: data.icon }),
    h("p", { class: sheet.classes.Label }, data.label)));
}

export { NavigationSidebarItemView as N };
