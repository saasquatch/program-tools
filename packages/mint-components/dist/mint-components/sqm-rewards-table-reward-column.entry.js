import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let RewardsTableColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Reward column title
     */
    this.columnTitle = "Reward";
    /**
     * @uiName Redeemed Amount Text
     */
    this.redeemedText = "{redeemedAmount} redeemed";
    /**
     * @uiName Available Amount Text
     */
    this.availableText = "{availableAmount} available";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    return (h$1("sqm-rewards-table-reward-cell", { reward: data === null || data === void 0 ? void 0 : data[0], redeemedText: this.redeemedText, availableText: this.availableText, locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { RewardsTableColumn as sqm_rewards_table_reward_column };
