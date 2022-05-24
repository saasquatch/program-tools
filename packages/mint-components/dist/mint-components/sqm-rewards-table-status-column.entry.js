import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let RewardTableStatusColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Column Title
     */
    this.columnTitle = "Status";
    /**
     * @uiName Reward Status Text
     */
    this.statusText = "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";
    /**
     * @uiName Expired Status Text
     */
    this.expiryText = "Expires on ";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    const rewardData = data === null || data === void 0 ? void 0 : data[0];
    return (h$1("sqm-rewards-table-status-cell", { statusText: this.statusText, reward: rewardData, expiryText: this.expiryText, locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { RewardTableStatusColumn as sqm_rewards_table_status_column };
