import { r as registerInstance, h as h$1 } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';

let ReferralTableCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.ignored = true;
    h(this);
  }
  disconnectedCallback() { }
  render() {
    return h$1("div", { innerHTML: this.innerTemplate });
  }
};

export { ReferralTableCell as sqm_referral_table_cell };
