import { h, j as Host, r as registerInstance } from './index-832bd454.js';
import { j as jn } from './index.module-b74a7f69.js';
import { n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import './extends-c31f1eff.js';

function RefreshButtonView(props, children) {
  return props.hide ? (h(Host, { style: { display: "none" } })) : (h(Host, null,
    h("style", { type: "text/css" }, `:host{display:inline-block}`),
    h("sl-button", { loading: props.loading, disabled: props.disabled, pill: props.pill, size: props.size, type: props.type, onClick: props.onClick, exportparts: `base: ${props.type}-refresh-base` },
      !props.hideicon && (h("sl-icon", { slot: props.iconslot, name: props.icon, exportparts: "icon" })),
      !props.hidetext && children)));
}

let RefreshButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Icon to show in the slot
     */
    this.icon = "arrow-clockwise";
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const thisProps = getProps(this);
    const props = jn()
      ? useDemoRefereshButton(thisProps)
      : useRefreshButton(thisProps);
    return (h(RefreshButtonView, Object.assign({}, props), h("slot", null)));
  }
};
function useDemoRefereshButton({ icon, }) {
  return {
    onClick: () => { },
    icon,
  };
}
function useRefreshButton({ icon }) {
  //   const { refresh } = useRefreshDispatcher();
  return {
    disabled: false,
    hide: false,
    // onClick: refresh,
    icon,
  };
}

export { RefreshButton as sqm_refresh_button };
