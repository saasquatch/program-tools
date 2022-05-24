import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { H as HeroView } from './sqm-hero-view-44303932.js';
import { g as getProps } from './utils-48175026.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let Hero = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** @uiName Number of columns in the layout */
    this.columns = 1;
    /** @uiName Padding size */
    this.paddingSize = "large";
    /** @uiName Wrap direction */
    this.wrapDirection = "wrap";
    h(this);
  }
  disconnectedCallback() { }
  render() {
    const props = {
      states: { ...getProps(this) },
      content: {
        primaryColumn: h$1("slot", null),
        secondaryColumn: h$1("slot", { name: "secondary-column" }),
      },
    };
    return h$1(HeroView, Object.assign({}, props));
  }
};

export { Hero as sqm_hero };
