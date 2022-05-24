import { h, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './extends-c31f1eff.js';

function HeroImageView(props, children) {
  const overlay = Boolean((props.header || props.description || props.buttonText) &&
    props.layout === "overlay");
  const style = {
    Container: {
      position: "relative",
      "&:before": {
        content: overlay ? '""' : "",
        width: "100%",
        height: "100%",
        position: "absolute",
        background: props.overlayColor || "var(--sl-color-primary-900)",
        opacity: props.overlayOpacity || "0.75",
      },
    },
    Image: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
      minHeight: props.minHeight || "300px",
      objectFit: "cover",
      margin: "auto",
    },
    Background: {
      minHeight: props.minHeight,
      backgroundImage: `url(${props.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: props.imagePos || "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    Overlay: {
      zIndex: "1",
      padding: "var(--sl-spacing-" + props.padding + ")",
      textAlign: "center",
      color: props.textColor || "var(--sl-color-neutral-0)",
      lineHeight: "var(--sl-line-height-dense)",
    },
    Column: {
      display: "flex",
      background: props.backgroundColor || "",
      flexDirection: props.imagePos === "right" ? "row-reverse" : "row",
      lineHeight: "var(--sl-line-height-dense)",
      color: props.textColor || "var(--sl-color-neutral-900)",
      "& .image-area": {
        width: "50%",
        boxSizing: "border-box",
        "@media (max-width: 599px)": {
          width: "100%",
        },
      },
      "& .text-area": {
        width: "50%",
        padding: "calc(2*var(--sl-spacing-" + props.padding + "))",
        alignSelf: "center",
        boxSizing: "border-box",
        "@media (max-width: 599px)": {
          width: "100%",
          textAlign: "center",
          padding: "var(--sl-spacing-" + props.padding + ")",
        },
      },
      "@media (max-width: 599px)": {
        flexDirection: props.imageMobilePos === "bottom" ? "column-reverse" : "column",
      },
    },
    Header: {
      fontSize: "var(--sl-font-size-xxx-large)",
      fontWeight: "var(--sl-font-weight-bold)",
      "@media (max-width: 599px)": {
        fontSize: "var(--sl-font-size-xx-large)",
      },
    },
    Description: {
      fontSize: "var(--sl-font-size-x-large)",
      margin: "var(--sl-spacing-small) 0",
      "@media (max-width: 599px)": {
        fontSize: "var(--sl-font-size-large)",
      },
    },
    Button: {
      marginTop: "var(--sl-spacing-medium)",
      "&::part(base)": {
        padding: "0 var(--sl-spacing-x-large)",
      },
      "@media (max-width: 599px)": {
        width: "100%",
      },
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  const vanillaStyle = `
  :host{
    display: block;
  }`;
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" },
      vanillaStyle,
      styleString),
    props.layout === "overlay" && OverlayView(),
    props.layout === "columns" && ColumnView()));
  function OverlayView() {
    return (h("div", { class: sheet.classes.Background },
      h("div", { class: sheet.classes.Overlay },
        props.header && (h("div", { class: sheet.classes.Header }, props.header)),
        props.description && (h("div", { class: sheet.classes.Description }, props.description)),
        props.buttonText && (h("sl-button", { class: sheet.classes.Button, type: "primary", onClick: () => props.buttonNewTab
            ? window.open(props.buttonLink)
            : window.open(props.buttonLink, "_parent") }, props.buttonText)),
        children && children)));
  }
  function ColumnView() {
    return (h("div", null,
      h("div", { class: sheet.classes.Column },
        h("div", { class: "image-area" },
          h("img", { class: sheet.classes.Image, src: props.imageUrl, style: { minHeight: "100%" } })),
        h("div", { class: "text-area" },
          props.header && (h("div", { class: sheet.classes.Header }, props.header)),
          props.description && (h("div", { class: sheet.classes.Description }, props.description)),
          props.buttonText && (h("sl-button", { class: sheet.classes.Button, type: "primary", onClick: () => props.buttonNewTab
              ? window.open(props.buttonLink)
              : window.open(props.buttonLink, "_parent") }, props.buttonText))))));
  }
}

let HeroImage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Minimum Image Height
     */
    this.minHeight = "300px";
    /**
     * @uiName Overlay Color
     */
    this.overlayColor = "var(--sl-color-primary-900)";
    /**
     * @uiName Overlay Opacity
     */
    this.overlayOpacity = "0.75";
    /**
     * @uiName Image Link
     * @uiType string
     * @uiEnum ["overlay", "columns"]
     */
    this.layout = "overlay";
    /**
     * @uiName Image Position
     * @uiType string
     * @uiEnum ["left", "center", "right"]
     */
    this.imagePos = "center";
    /**
     * @uiName Image Mobile Position
     * @uiType string
     * @uiEnum ["top", "bottom"]
     */
    this.imageMobilePos = "top";
    /**
     * @uiName CTA Button Link Open in New Tab
     */
    this.buttonNewTab = false;
    /**
     * @uiName Padding
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.padding = "xx-large";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    return (h(HeroImageView, Object.assign({}, getProps(this)), h("slot", null)));
  }
};

export { HeroImage as sqm_hero_image };
