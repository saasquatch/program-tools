import { h } from './index-832bd454.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { H as HostBlock } from './mixins-d2de6ff8.js';

const style = {
  HostBlock: HostBlock,
  inputStyle: {
    "&::part(base)": { background: "white", opacity: "1", cursor: "pointer" },
  },
};
const sheet = createStyleSheet(style);
const styleString = sheet.toString();
function ShareLinkView(props) {
  return (h("div", null,
    h("style", { type: "text/css" }, styleString),
    h("sl-tooltip", { trigger: "manual", content: props.tooltiptext, placement: "top-end", disabled: props.disabled, open: props.open },
      h("sl-input", { class: sheet.classes.inputStyle, exportparts: "label: input-label", value: props.shareString, readonly: true },
        h("sl-icon-button", { onClick: () => { var _a; return (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.call(props); }, slot: "suffix", name: "files", disabled: props.disabled })))));
}

export { ShareLinkView as S };
