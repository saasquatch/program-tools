import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let ReferralTableStatusColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Column Title
     */
    this.columnTitle = "Status";
    /**
     * @uiName Converted Status Text
     */
    this.convertedStatusText = "Converted";
    /**
     * @uiName In Progress Status Text
     */
    this.inProgressStatusText = "In Progress";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data) {
    // TODO: Make ICU and more complete
    const statusText = data.dateConverted
      ? this.convertedStatusText
      : this.inProgressStatusText;
    return (h$1("sqm-referral-table-status-cell", { "status-text": statusText, converted: data.dateConverted ? true : false }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { ReferralTableStatusColumn as sqm_referral_table_status_column };
