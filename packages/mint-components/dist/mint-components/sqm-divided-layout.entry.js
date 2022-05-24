import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { g as getProps } from './utils-48175026.js';
import './extends-c31f1eff.js';

function DividedLayoutView(props, children) {
  const getBorder = () => {
    if (props.direction === "row") {
      return { "border-right": props.dividerStyle || "1px solid #EAEAEA" };
    }
    else {
      return { "border-bottom": props.dividerStyle || "1px solid #EAEAEA" };
    }
  };
  const style = {
    LayoutContainer: {
      display: "contents",
      // "min-width": "320px",
      // "& > ::slotted(*)": {
      //   "min-width": "320px",
      // },
      // First style applies when shadow DOM is disabled, second applies when shadow DOM is enabled
      "& > :not(:last-child)": {
        ...getBorder(),
      },
      "& > ::slotted(*:not(:last-child))": {
        ...getBorder(),
      },
    },
  };
  const hostStyle = `
    display: flex;
    flex: 1;
    flex-direction: ${props.direction};
    background-color: var(--sqm-content-background);
    ${props.direction === "column"
    ? "width: 100%; max-width: var(--sqm-portal-main-width);"
    : ""}
  `;
  const vanillaStyle = `
  :host{
    ${hostStyle}
  }
  sqm-divided-layout {
    ${hostStyle}
  }
  `;
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", { class: sheet.classes.LayoutContainer },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    children));
}

let DividedLayout = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Uses CSS border style syntax
     * @uiName Border style
     */
    this.dividerStyle = "1px solid #EAEAEA";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    return (h(DividedLayoutView, Object.assign({}, getProps(this)), h("slot", null)));
  }
};

export { DividedLayout as sqm_divided_layout };
