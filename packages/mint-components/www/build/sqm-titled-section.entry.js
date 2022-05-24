import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { P as PortalSectionView } from './sqm-portal-section-view-5c942599.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let TitledSection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Text Align
     * @uiType string
     * @uiEnum ["left", "center", "right"]
     */
    this.align = "left";
    /**
     * @uiName Label margin style
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.labelMargin = "small";
    /**
     * @uiName Section padding
     * @uiType string
     * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
     */
    this.padding = "none";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const label = h$1("slot", { name: "label" }, this.label);
    const content = h$1("slot", { name: "content" });
    return h$1(PortalSectionView, Object.assign({}, { ...getProps(this), label, content }));
  }
};

export { TitledSection as sqm_titled_section };
