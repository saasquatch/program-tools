import { r as registerInstance, h as h$1, e as getElement, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let ReferralTableGenericColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(_) {
    // this is insecure, <script> tags can be added
    return (h$1("sqm-referral-table-cell", { "inner-template": getElement(this).innerHTML }));
  }
  async renderLabel() {
    return Promise.resolve(this.columnTitle);
  }
  render() {
    useRequestRerender([this.columnTitle]);
    return (h$1(Host, { style: { display: "none" } }, h$1("slot", null)));
  }
};

export { ReferralTableGenericColumn as sqm_referral_table_column };
