import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';

function ReferralIframeView(props) {
  const { states, data } = props;
  const { content } = states;
  const style = {
    Container: {
      position: "relative",
      width: content.iframeWidth,
      height: content.iframeHeight,
    },
    IFrame: {
      position: "absolute",
      width: "100%",
      height: "100%",
      border: "0",
      top: "0",
      left: "0",
      right: "0",
    },
  };
  // JSS config
  const sheet = createStyleSheet(style);
  const styleString = sheet.toString();
  return (h("div", { class: sheet.classes.Container },
    h("style", { type: "text/css" }, styleString),
    h("iframe", { class: sheet.classes.IFrame, src: `${content.iframeSrc}?rsCode=${data.shareCode}` })));
}

export { ReferralIframeView as R };
