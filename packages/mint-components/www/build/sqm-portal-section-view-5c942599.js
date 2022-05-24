import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function PortalSectionView(props) {
  const style = {
    LabelContainer: {
      "margin-bottom": props.labelMargin === "none"
        ? props.labelMargin
        : `var(--sl-spacing-${props.labelMargin})`,
    },
    SectionContainer: {
      textAlign: props.align || "left",
      padding: props.padding === "none" ? "0" : `var(--sl-spacing-${props.padding})`,
    },
  };
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", { class: sheet.classes.SectionContainer },
    h("style", { type: "text/css" }, styleString),
    h("div", { class: sheet.classes.LabelContainer }, props.label),
    props.content));
}

export { PortalSectionView as P };
