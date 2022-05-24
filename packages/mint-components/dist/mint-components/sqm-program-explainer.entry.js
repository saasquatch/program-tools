import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

function ProgramExplainerView(props, children) {
  const style = {
    Container: {
      color: props.textColor || "var(--sl-color-neutral-900)",
      background: props.backgroundColor || "",
    },
    Header: {
      fontSize: "var(--sl-font-size-x-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      lineHeight: "var(--sl-line-height-dense)",
      marginBottom: "var(--sl-spacing-large)",
      textAlign: "center",
    },
    Grid: {
      display: "flex",
      flexDirection: "row",
      gap: "var(--sl-spacing-large)",
      "@media (max-width: 499px)": {
        flexDirection: "column",
      },
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
  ::slotted(*){
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    ::slotted(*){
      display: block;
    }
  }`;
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" },
      styleString,
      vanillaStyle),
    h("div", { class: sheet.classes.Header },
      h("div", { class: sheet.classes.Header }, props.header)),
    h("div", { class: sheet.classes.Grid }, children)));
}

let ProgramExplainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    return (h(ProgramExplainerView, Object.assign({}, getProps(this)), h("slot", null)));
  }
};

export { ProgramExplainer as sqm_program_explainer };
