import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { l as ln, j as jn } from './index.module-b74a7f69.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { c as cjs } from './cjs-e829b75b.js';
import { g as getProps } from './utils-48175026.js';
import { N as NavigationSidebarItemView } from './sqm-navigation-sidebar-item-view-267646a8.js';
import './extends-c31f1eff.js';
import './JSS-f59933eb.js';
import './mixins-d2de6ff8.js';

function useNavigationSidebarItem(props) {
  const currentPage = ln();
  return {
    states: {
      active: currentPage.pathname === props.path,
    },
    data: {
      label: props.label,
      icon: props.icon,
      path: props.path
    },
  };
}

let NavigationSidebarItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = jn()
      ? useSidebarItemDemo(getProps(this))
      : useNavigationSidebarItem(getProps(this));
    return h$1(NavigationSidebarItemView, Object.assign({}, props));
  }
};
function useSidebarItemDemo(props) {
  return cjs({
    states: {
      active: false,
    },
    data: {
      label: props.label || "Dashboard",
      icon: props.icon || "house",
    },
  }, props.demoData || {}, { arrayMerge: (_, a) => a });
}

export { NavigationSidebarItem as sqm_navigation_sidebar_item };
