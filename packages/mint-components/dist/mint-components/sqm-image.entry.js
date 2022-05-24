import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

function ImageView(props) {
  const style = {
    Container: {
      display: "flex",
      width: "100%",
      justifyContent: props.align || "center",
      background: props.backgroundColor || "",
    },
    Image: {
      maxWidth: "100%",
      objectFit: "cover",
      marginLeft: props.left || "0",
      marginRight: props.right || "0",
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  console.log(props);
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
      h("img", { src: props.imageUrl, class: sheet.classes.Image }))));
}

let Image = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Position Alignment
     * @uiType string
     * @uiEnum ["left", "center", "right"]
     */
    this.align = "center";
    this.ignored = true;
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    return h(ImageView, Object.assign({}, getProps(this)));
  }
};

export { Image as sqm_image };
