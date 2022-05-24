import { r as registerInstance, h } from './index-832bd454.js';
import { i as intl } from './global-b1f18590.js';
import './stencil-hooks.module-f4b05383.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';
import './insertcss-d82cf6d6.js';

let RewardTableSourceCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.locale = "en";
  }
  render() {
    intl.locale = this.locale;
    const RewardSource = ({ reward }) => {
      return (h("span", null, intl.formatMessage({
        id: "rewardSourceText",
        defaultMessage: this.rewardSourceText,
      }, {
        rewardSource: reward.rewardSource,
      })));
    };
    const SOURCE_COLUMN_LENGTH = 21;
    const RewardExchangeBadge = ({ reward }) => {
      var _a;
      const rewardExchange = (h("div", null, h("span", { style: {
          fontSize: "var(--sl-font-size-small)",
          color: "var(--sl-color-neutral-500)",
        } }, this.rewardExchangeText), h("br", null), (_a = reward.exchangedRewardRedemptionTransaction) === null || _a === void 0 ? void 0 :
        _a.prettyRedeemedCredit, " → ", reward.prettyValue));
      return reward.exchangedRewardRedemptionTransaction.prettyRedeemedCredit
        .length +
        reward.prettyValue.length <
        SOURCE_COLUMN_LENGTH ? (rewardExchange) : (h("div", { style: {
          display: "inline-block",
          verticalAlign: "top",
          // maxWidth: "155px",
        } }, rewardExchange));
    };
    // TODO: user type
    const getFullName = (user) => {
      if (!user)
        return this.deletedUserText;
      if (!user.firstName && !user.lastName)
        return this.anonymousUserText;
      if (!user.firstName)
        return `${user.lastName}`;
      if (!user.lastName)
        return `${user.firstName}`;
      return `${user.firstName} ${user.lastName}`;
    };
    const Source = () => this.reward.rewardSource === "FRIEND_SIGNUP" ||
      this.reward.rewardSource === "REFERRED" ? (h("div", null, h("div", { style: {
        fontSize: "var(--sl-font-size-small)",
        color: "var(--sl-color-neutral-500)",
      } }, intl.formatMessage({
      id: "referralText",
      defaultMessage: this.referralText,
    }, {
      rewardSource: this.reward.rewardSource,
    })), h("div", null, this.reward.rewardSource == "FRIEND_SIGNUP" ? getFullName(this.reward.referral.referredUser) : getFullName(this.reward.referral.referrerUser)))) : this.reward.exchangedRewardRedemptionTransaction ? (h(RewardExchangeBadge, { reward: this.reward })) : (h(RewardSource, { reward: this.reward }));
    return h(Source, null);
  }
};

export { RewardTableSourceCell as sqm_rewards_table_source_cell };
