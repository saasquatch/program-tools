import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { S as StatContainerView } from './sqm-stat-container-view-5dff82d8.js';
import { g as getProps } from './utils-48175026.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let StatContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Space between stats
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.space = "xxx-large";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return (h$1(StatContainerView, Object.assign({}, getProps(this)), h$1("slot", null)));
  }
};

export { StatContainer as sqm_stat_container };
