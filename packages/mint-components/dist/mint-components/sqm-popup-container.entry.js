import { h, j as Host, r as registerInstance } from './index-832bd454.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { R as Rn } from './index.module-b74a7f69.js';
import { g as getProps } from './utils-48175026.js';
import './extends-c31f1eff.js';

const PopupContainerView = (props) => {
  const { states, callbacks } = props;
  const { styles } = states;
  return (h(Host, { class: "squatch-container" },
    h("div", { style: { padding: props.states.styles.padding } },
      styles.closeButton && (h("span", { class: "close squatch-header-close", "data-close-panel": "#squatch-panel", onClick: () => callbacks.closePopup() }, styles.closeButtonText)),
      h("slot", null),
      styles.poweredBy ? (h("a", { class: "sqh-attribution", href: "https://www.saasquatch.com/?utm_source=app&utm_medium=user-widget&utm_campaign=referral-widget", target: "_blank" }, "Powered By")) : (""))));
};

function usePopupContainer(props) {
  const engagementMedium = Rn();
  function closePopup() {
    var _a;
    if (Rn() === "POPUP") {
      (_a = window.frameElement["squatchJsApi"]) === null || _a === void 0 ? void 0 : _a.close();
    }
  }
  const popupPadding = props.popupPadding
    ? props.popupPadding === "none"
      ? "0"
      : `var(--sl-spacing-${props.popupPadding})`
    : "var(--sl-spacing-medium)";
  const embedPadding = props.embedPadding
    ? props.embedPadding === "none"
      ? "0"
      : `var(--sl-spacing-${props.embedPadding})`
    : "0";
  const padding = Rn() === "POPUP" ? popupPadding : embedPadding;
  return {
    states: {
      showCloseButton: props.closeButton && engagementMedium === "POPUP",
      styles: {
        ...props,
        padding,
        closeButtonText: props.closeButtonText ? props.closeButtonText : "X",
      },
    },
    data: {},
    callbacks: { closePopup },
  };
}

const sqmPopupContainerCss = ".squatch-header-close{position:absolute;right:20px;top:10px;cursor:pointer}.squatch-container{background-color:var(--widget-background-color);display:block}";

let PopupContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const thisProps = getProps(this);
    return h(PopupContainerView, Object.assign({}, usePopupContainer(thisProps)));
  }
};
PopupContainer.style = sqmPopupContainerCss;

export { PopupContainer as sqm_popup_container };
