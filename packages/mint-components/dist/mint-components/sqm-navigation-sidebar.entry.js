import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { N as NavigationSidebarView } from './sqm-navigation-sidebar-view-3b9dd3e0.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';
import './mixins-d2de6ff8.js';

let NavigationSidebar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return (h$1(NavigationSidebarView, null, h$1("slot", null)));
  }
};

export { NavigationSidebar as sqm_navigation_sidebar };
