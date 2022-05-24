import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { j as jn } from './index.module-b74a7f69.js';
import { u as useShareButton, S as ShareButtonView } from './useShareButton-eca397a6.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

const sqmShareButtonCss = ":host{display:block}:host([hidden]){display:none}sl-button{display:block}";

let ShareButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiType string
     * @uiName Button Style
     * @uiEnum ["primary" , "success", "info", "warning", "danger", "default", "text" ]
     */
    this.type = "default";
    /**
     * @uiName Icon Location
     * @uiType string
     * @uiEnum ["prefix", "suffix" ]
     * @uiEnumNames ["Prefix", "Suffix"]
     */
    this.iconslot = "prefix";
    /**
     * @uiName Hide the icon
     */
    this.hideicon = false;
    /**
     * @uiName Hide the text
     */
    this.hidetext = false;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const thisProps = getProps(this);
    const props = jn()
      ? useDemoShareButton(thisProps)
      : useShareButton(thisProps);
    return (h$1(ShareButtonView, Object.assign({}, props), h$1("slot", null)));
  }
};
function useDemoShareButton(props) {
  return cjs({
    ...props,
    loading: false,
    hide: false,
    onClick: () => {
      // TODO: Provide visual feedback
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
ShareButton.style = sqmShareButtonCss;

export { ShareButton as sqm_share_button };
