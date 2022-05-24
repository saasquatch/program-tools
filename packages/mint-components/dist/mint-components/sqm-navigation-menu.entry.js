import { h, r as registerInstance, j as Host } from './index-832bd454.js';
import { j as useRef, i as useEffect, n as h$1 } from './stencil-hooks.module-f4b05383.js';
import { b as dn, r as rn, i as ie, j as jn } from './index.module-b74a7f69.js';
import { g as getProps } from './utils-48175026.js';
import { c as cjs } from './cjs-e829b75b.js';
import './extends-c31f1eff.js';

function NavigationMenuView(props) {
  const { states } = props;
  const { styles } = states;
  return states.includeDropdown ? (h("sl-dropdown", { style: "margin-bottom: var(--sl-spacing-large)" },
    h("sl-button", { slot: "trigger", caret: true, onClick: props.callbacks.rerender, exportparts: "base: dropdownbutton-base" }, styles.menuLabel),
    h("sl-menu", { ref: (r) => {
        if (props.ref.current === undefined) {
          props.ref.current = r;
          props.callbacks.rerender();
        }
      } },
      h("slot", null)))) : ("");
}

function handleMenu(e) {
  dn.push(e.detail.item.value);
}
function useNavigationMenu(props) {
  const ref = useRef();
  const [, rerender] = rn();
  const user = ie();
  useEffect(() => {
    var _a;
    (_a = ref.current) === null || _a === void 0 ? void 0 : _a.addEventListener("sl-select", (e) => handleMenu(e));
  }, [ref.current]);
  return {
    states: {
      includeDropdown: ((user === null || user === void 0 ? void 0 : user.id) || (user === null || user === void 0 ? void 0 : user.accountId) || (user === null || user === void 0 ? void 0 : user.jwt)) !== undefined,
      styles: {
        menuLabel: props.menuLabel,
      },
    },
    callbacks: {
      rerender,
    },
    ref,
  };
}

const sqmNavigationMenuCss = ":host{display:block}:host([hidden]){display:none}.HeaderWrapper{width:100%;max-width:100%;box-sizing:border-box;display:flex;justify-content:space-between;padding:var(--sl-spacing-small) var(--sl-spacing-large);align-items:center;background-color:var(--sqm-header-background)}@media screen and (max-width: 499px){.HeaderWrapper{flex-direction:row-reverse;justify-content:flex-end;padding:0 var(--sl-spacing-x-small)}}";

let NavigationMenu = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h$1(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn()
      ? useNavigationMenuDemo(getProps(this))
      : useNavigationMenu(getProps(this));
    return (h(Host, { slot: "sqm-navigation-menu" }, h(NavigationMenuView, Object.assign({}, props))));
  }
};
function useNavigationMenuDemo(props) {
  return cjs({
    states: {
      includeDropdown: true,
      styles: {
        ...props,
        menuLabel: "Menu",
      },
    },
    callbacks: {
      rerender: () => { },
    },
    ref: { current: undefined },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
NavigationMenu.style = sqmNavigationMenuCss;

export { NavigationMenu as sqm_navigation_menu };
