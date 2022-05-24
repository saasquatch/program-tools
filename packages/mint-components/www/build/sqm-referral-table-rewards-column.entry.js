import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let ReferralTableRewardsColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName Reward column title
     */
    this.columnTitle = "Rewards";
    /**
     * @uiName Reward Status Text
     */
    this.statusText = "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";
    /**
     * @uiName Reward Status Long Text
     */
    this.statusLongText = "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} EXPIRED {Reward expired on} other {Not available} }";
    /**
     * @uiName Fuel Tank Code Text
     */
    this.fuelTankText = "Your code is";
    /**
     * @uiName Reward Received Text
     */
    this.rewardReceivedText = "Reward received on";
    /**
     * @uiName Reward Expiring Text
     */
    this.expiringText = "Expiring in";
    /**
     * @uiName Reward Pending Text
     */
    this.pendingForText = "{status} for {date}";
    /**
     * @uiName Hide dropdown details of reward
     */
    this.hideDetails = false;
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    return (h$1("sqm-referral-table-rewards-cell", { rewards: data.rewards, statusText: this.statusText, statusLongText: this.statusLongText, fuelTankText: this.fuelTankText, rewardReceivedText: this.rewardReceivedText, expiringText: this.expiringText, pendingForText: this.pendingForText, hideDetails: this.hideDetails, locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([this.columnTitle]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { ReferralTableRewardsColumn as sqm_referral_table_rewards_column };
