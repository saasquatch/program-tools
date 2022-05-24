import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

function ProgramExplainerStepView(props) {
  const style = {
    Container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "var(--sl-spacing-x-large)",
      lineHeight: "var(--sl-line-height-dense)",
      color: props.textColor || "var(--sl-color-neutral-900)",
      background: props.backgroundColor || "var(--sl-color-primary-50)",
      "@media (max-width: 499px)": {
        flexDirection: "row",
        width: "auto",
        paddingBottom: "var(--sl-spacing-large)",
      },
    },
    Text: {
      "@media (max-width: 499px)": {
        marginLeft: "var(--sl-spacing-large)",
      },
    },
    Header: {
      fontSize: "var(--sl-font-size-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      marginTop: "var(--sl-spacing-x-large)",
      "@media (max-width: 499px)": {
        margin: "0",
      },
    },
    Description: {
      fontSize: "var(--sl-font-size-medium)",
      marginTop: "var(--sl-spacing-small)",
      "@media (max-width: 499px)": {
        marginTop: "var(--sl-spacing-x-small)",
      },
    },
    Media: {
      width: "64px",
      height: "64px",
      borderRadius: "100%",
      objectFit: "cover",
      userSelect: "none",
      background: "#FFF",
      color: "var(--sl-color-primary-300)",
      fontSize: "26px",
      textAlign: "center",
      lineHeight: "72px",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
  :host{
    display: flex;
    width: 100%;
  }
  @media (max-width: 499px) {
    :host{
      display: block;
    }
  }`;
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" }, styleString),
    h("div", null, props.imageUrl ? (h("img", { class: sheet.classes.Media, src: props.imageUrl })) : (h("div", { class: sheet.classes.Media },
      h("sl-icon", { name: props.icon })))),
    h("div", { class: sheet.classes.Text },
      h("div", { class: sheet.classes.Header }, props.header),
      h("div", { class: sheet.classes.Description }, props.description))));
}

let ProgramExplainerStep = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    return h(ProgramExplainerStepView, Object.assign({}, getProps(this)));
  }
};

export { ProgramExplainerStep as sqm_program_explainer_step };
