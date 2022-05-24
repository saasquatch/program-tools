import { r as registerInstance, h as h$1, j as Host } from './index-832bd454.js';
import { n as h } from './stencil-hooks.module-f4b05383.js';
import { u as useRequestRerender } from './re-render-22c375e6.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';

let RewardTableUserColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @uiName User Column Title
     */
    this.columnTitle = "Source";
    /**
     * @uiName Name displayed for anonymous users
     */
    this.anonymousUser = "Anonymous User";
    /**
     * @uiName Name displayed for deleted users
     */
    this.deletedUser = "Deleted User";
    /**
     * @uiName Reward Exchange label
     */
    this.rewardExchangeText = "Reward Exchange";
    /**
     * Shown when a reward has been created by a referral
     *
     * @uiName Referral Text
     */
    this.referralText = "{rewardSource, select, FRIEND_SIGNUP {Referral to} REFERRED {Referred by} other {}}";
    /**
     * @uiName Reward Source Text
     */
    this.rewardSourceText = "{rewardSource, select, MANUAL {Manual} AUTOMATED {Automated} other {}}";
    h(this);
  }
  disconnectedCallback() { }
  async renderCell(data, locale) {
    return (h$1("sqm-rewards-table-source-cell", { reward: data === null || data === void 0 ? void 0 : data[0], anonymousUserText: this.anonymousUser, deletedUserText: this.deletedUser, rewardExchangeText: this.rewardExchangeText, referralText: this.referralText, rewardSourceText: this.rewardSourceText, locale: locale }));
  }
  async renderLabel() {
    return this.columnTitle;
  }
  render() {
    useRequestRerender([
      this.deletedUser,
      this.anonymousUser,
      this.columnTitle,
    ]);
    return h$1(Host, { style: { display: "none" } });
  }
};

export { RewardTableUserColumn as sqm_rewards_table_source_column };
