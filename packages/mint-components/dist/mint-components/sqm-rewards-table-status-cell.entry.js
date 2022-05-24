import { r as registerInstance, h } from './index-832bd454.js';
import { l as luxon } from './luxon-1decee23.js';
import { i as intl } from './global-b1f18590.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { l as luxonLocale } from './utils-48175026.js';
import './stencil-hooks.module-f4b05383.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';
import './insertcss-d82cf6d6.js';

let RewardTableStatusCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.locale = "en";
  }
  rewardStatus(reward) {
    if (reward.dateCancelled)
      return "CANCELLED";
    if (reward.statuses && reward.statuses.includes("EXPIRED"))
      return "EXPIRED";
    if (reward.statuses && reward.statuses.includes("PENDING"))
      return "PENDING";
    if (reward.type === "CREDIT") {
      if (reward.statuses.includes("REDEEMED"))
        return "REDEEMED";
      return "AVAILABLE";
    }
    if (reward.type === "PCT_DISCOUNT") {
      if (reward.statuses.includes("AVAILABLE"))
        return "AVAILABLE";
    }
    if (reward.type === "INTEGRATION" || reward.type === "FUELTANK") {
      if (reward.statuses && reward.statuses.includes("PENDING"))
        return "PENDING";
      if (reward.statuses && reward.statuses.includes("CANCELLED"))
        return "CANCELLED";
      if (reward.statuses.includes("AVAILABLE"))
        return "AVAILABLE";
    }
    return "";
  }
  render() {
    var _a;
    intl.locale = this.locale;
    const style = {
      Badge: {
        "&::part(base)": {
          fontSize: "var(--sl-font-size-small)",
          padding: "4px 8px",
        },
      },
      RedeemBadge: {
        "&::part(base)": {
          fontSize: "var(--sl-font-size-small)",
          padding: "4px 8px",
          background: "var(--sl-color-blue-600)",
        },
      },
      Date: {
        fontSize: "var(--sl-font-size-small)",
        color: "var(--sl-color-neutral-500)",
        margin: "0",
      },
    };
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    const rewardStatus = this.rewardStatus(this.reward);
    const statusText = intl.formatMessage({ id: "statusMessage", defaultMessage: this.statusText }, {
      status: rewardStatus,
    });
    const badgeType = rewardStatus === "AVAILABLE"
      ? "success"
      : rewardStatus === "REDEEMED"
        ? "primary"
        : rewardStatus === "PENDING"
          ? "warning"
          : "danger";
    const dateShown = this.reward.dateCancelled ||
      this.reward.dateExpires ||
      this.reward.dateRedeemed ||
      "";
    const date = dateShown &&
      `${rewardStatus === "AVAILABLE" && this.reward.dateExpires
        ? this.expiryText + " "
        : ""}${(_a = luxon.DateTime.fromMillis(dateShown)) === null || _a === void 0 ? void 0 : _a.setLocale(luxonLocale(luxonLocale(this.locale))).toLocaleString(luxon.DateTime.DATE_MED)}`;
    return (h("div", { style: { display: "contents" } }, h("style", { type: "text/css" }, styleString), h("sl-badge", { type: badgeType, pill: true, class: rewardStatus === "REDEEMED"
        ? sheet.classes.RedeemBadge
        : sheet.classes.Badge }, statusText), h("p", { class: sheet.classes.Date }, date)));
  }
};

export { RewardTableStatusCell as sqm_rewards_table_status_cell };
