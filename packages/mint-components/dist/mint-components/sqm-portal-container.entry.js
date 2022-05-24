import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { P as PortalContainerView } from './sqm-portal-container-view-79dfef65.js';
import { g as getProps } from './utils-48175026.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let PortalContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Direction
     * @uiType string
     * @uiEnum ["row", "column"]
     */
    this.direction = "column";
    /**
     * @uiName Gap
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.gap = "xxx-large";
    /**
     * @uiName Display
     * @uiType string
     * @uiEnum ["grid", "flex"]
     */
    this.display = "grid";
    /**
     * @uiName Maximum width
     */
    this.maxWidth = "100%";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return (h$1(PortalContainerView, Object.assign({}, getProps(this)), h$1("slot", null)));
  }
};

export { PortalContainer as sqm_portal_container };
