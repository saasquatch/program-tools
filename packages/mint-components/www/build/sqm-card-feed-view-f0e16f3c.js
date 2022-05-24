import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function CardFeedView(props, children) {
  const style = {
    Container: {
      columnGap: props.gap + "px",
      columnWidth: props.width + "px",
      "& > div": {
        marginBottom: "24px",
      },
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
    h("div", { class: sheet.classes.Container }, children)));
}

export { CardFeedView as C };
