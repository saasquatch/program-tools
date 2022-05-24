import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

function ReferralCardView(props) {
  const style = {
    Container: {
      display: "flex",
      color: "var(--sl-color-neutral-900)",
      "& .left": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
        paddingRight: "var(--sl-spacing-medium)",
        alignSelf: props.verticalAlignment,
        "@media (max-width: 499px)": {
          width: "100%",
          padding: "0",
          marginBottom: "var(--sl-spacing-xx-large)",
        },
      },
      "& .right": {
        width: "50%",
        padding: "var(--sl-spacing-" + props.padding + ")",
        paddingLeft: "var(--sl-spacing-medium)",
        alignSelf: props.verticalAlignment,
        "@media (max-width: 499px)": {
          width: "100%",
          padding: "0",
        },
      },
      border: "1px solid var(--sl-color-neutral-300)",
      borderRadius: "var(--sl-border-radius-large)",
      "@media (max-width: 499px)": {
        flexDirection: "column",
        border: "none",
      },
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
    :host{
      display: block;   
    }
  `;
  return (h("div", null,
    h("style", { type: "text/css" },
      styleString,
      vanillaStyle),
    h("div", { class: sheet.classes.Container },
      h("div", { class: "left" }, props.slots.left),
      h("div", { class: "right" }, props.slots.right))));
}

let ReferralCard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Padding
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.padding = "large";
    /**
     * @uiName Padding
     * @uiType string
     * @uiEnum ["start", "center", "end"]
     */
    this.verticalAlignment = "start";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const slots = {
      left: h("slot", { name: "left" }),
      right: h("slot", { name: "right" }),
    };
    return (h(ReferralCardView, Object.assign({}, getProps(this), { slots: slots }), h("slot", null)));
  }
};

export { ReferralCard as sqm_referral_card };
