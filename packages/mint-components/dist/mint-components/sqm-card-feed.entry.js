import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { g as getProps } from './utils-48175026.js';
import { C as CardFeedView } from './sqm-card-feed-view-f0e16f3c.js';
import './JSS-f59933eb.js';
import './extends-c31f1eff.js';

let CardFeed = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    /**
     * @uiName Card Width
     */
    this.width = 347;
    /**
     * @uiName Column Gap
     * @uiType number
     */
    this.gap = 24;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return (h$1(CardFeedView, Object.assign({}, getProps(this)), h$1("slot", null)));
  }
};

export { CardFeed as sqm_card_feed };
