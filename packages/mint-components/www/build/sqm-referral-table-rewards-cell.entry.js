import { r as registerInstance, h } from './index-832bd454.js';
import { l as luxon } from './luxon-1decee23.js';
import { T as TextSpanView } from './sqm-text-span-view-6c68cc9a.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import { i as intl } from './global-b1f18590.js';
import { l as luxonLocale } from './utils-48175026.js';
import './stencil-hooks.module-f4b05383.js';
import './extends-c31f1eff.js';
import './index.module-b74a7f69.js';
import './insertcss-d82cf6d6.js';

let ReferralTableRewardsCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.locale = "en";
  }
  render() {
    intl.locale = this.locale;
    const style = {
      "@keyframes slideRight": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      DetailsContainer: {
        width: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        "margin-right": "var(--sl-spacing-small)",
        "flex-wrap": "wrap",
      },
      Details: {
        "padding-bottom": "var(--sl-spacing-small)",
        "max-width": "500px",
        // "padding-right": "var(--sl-spacing-x-small)",
        "&::part(header)": {
          padding: "var(--sl-spacing-x-small)",
          cursor: `${this.hideDetails ? "default" : "pointer"}`,
        },
        "&::part(content)": {
          padding: "var(--sl-spacing-x-small) var(--sl-spacing-medium)",
        },
        "&::part(base)": {
          opacity: "1",
        },
        "&::part(summary-icon)": {
          display: `${this.hideDetails ? "none" : "flex"}`,
        },
        "&::part(summary-icon[open])": {
          transform: "rotate(-90deg)",
          background: "red",
        },
      },
      BadgeContainer: {
        "& > :not(:last-child)": {
          "margin-right": "var(--sl-spacing-x-small)",
        },
      },
      BoldText: {
        "font-weight": "var(--sl-font-weight-semibold)",
      },
      StatusBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
      },
      RedeemBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
        "&::part(base)": {
          background: "var(--sl-color-blue-600)",
        },
      },
    };
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    const getState = (states) => {
      const possibleStates = [
        "REDEEMED",
        "CANCELLED",
        "EXPIRED",
        "PENDING",
        "AVAILABLE",
      ];
      if (states.length === 1)
        return states[0];
      return possibleStates.find((state) => states.includes(state) && state);
    };
    const getSLBadgeType = (state) => {
      switch (state) {
        case "REDEEMED":
          return "primary";
        case "EXPIRED":
          return "danger";
        case "CANCELLED":
          return "danger";
        case "PENDING":
          return "warning";
        case "AVAILABLE":
          return "success";
      }
    };
    const getTimeDiff = (endTime) => {
      // Current implementation only calculates the difference from current time
      return luxon.DateTime.fromMillis(endTime)
        .setLocale(luxonLocale(this.locale))
        .toRelative()
        .replace("in", "")
        .trim();
    };
    return this.rewards.map((reward) => {
      const state = getState(reward.statuses);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = intl.formatMessage({ id: "statusShortMessage", defaultMessage: this.statusText }, {
        status: state,
      });
      const statusText = intl.formatMessage({
        id: "statusLongMessage",
        defaultMessage: this.statusLongText,
      }, {
        status: state,
      });
      const rid = Math.random().toString(36).slice(2);
      return (h("sl-details", { class: sheet.classes.Details, disabled: this.hideDetails }, h("style", { type: "text/css" }, styleString), h("div", { slot: "summary", class: sheet.classes.DetailsContainer }, h(TextSpanView, { type: "p" }, h("span", { class: sheet.classes.BoldText }, reward.prettyValue)), h("div", { class: sheet.classes.BadgeContainer }, state === "PENDING" && reward.dateScheduledFor ? (h("sl-badge", { class: slBadgeType === "primary"
          ? sheet.classes.RedeemBadge
          : sheet.classes.StatusBadge, type: slBadgeType, pill: true }, intl.formatMessage({
        id: "pendingForText",
        defaultMessage: this.pendingForText,
      }, {
        status: badgeText,
        date: getTimeDiff(reward.dateScheduledFor),
      }))) : (h("sl-badge", { class: slBadgeType === "primary"
          ? sheet.classes.RedeemBadge
          : sheet.classes.StatusBadge, type: slBadgeType, pill: true }, badgeText)), reward.dateExpires && state === "AVAILABLE" && (h("sl-badge", { class: slBadgeType === "primary"
          ? sheet.classes.RedeemBadge
          : sheet.classes.StatusBadge, type: "info", pill: true }, this.expiringText, ` ${getTimeDiff(reward.dateExpires)}`)))), h("div", null, reward.dateGiven && (h("div", null, h(TextSpanView, { type: "p" }, this.rewardReceivedText, " ", h("span", { class: sheet.classes.BoldText }, luxon.DateTime.fromMillis(reward.dateGiven)
        .setLocale(luxonLocale(this.locale))
        .toLocaleString(luxon.DateTime.DATE_MED))))), state === "EXPIRED" && reward.dateExpires && (h("div", null, h(TextSpanView, { type: "p" }, statusText, " ", h("span", { class: sheet.classes.BoldText }, luxon.DateTime.fromMillis(reward.dateExpires)
        .setLocale(luxonLocale(this.locale))
        .toLocaleString(luxon.DateTime.DATE_MED))))), state === "CANCELLED" && reward.dateCancelled && (h("div", null, h(TextSpanView, { type: "p" }, statusText, " ", h("span", { class: sheet.classes.BoldText }, luxon.DateTime.fromMillis(reward.dateCancelled)
        .setLocale(luxonLocale(this.locale))
        .toLocaleString(luxon.DateTime.DATE_MED))))), state === "PENDING" && reward.dateScheduledFor && (h("div", null, h(TextSpanView, { type: "p" }, statusText, " ", h("span", { class: sheet.classes.BoldText }, luxon.DateTime.fromMillis(reward.dateScheduledFor)
        .setLocale(luxonLocale(this.locale))
        .toLocaleString(luxon.DateTime.DATE_MED))))), " ", state === "AVAILABLE" && reward.dateExpires && (h("div", null, h(TextSpanView, { type: "p" }, statusText, " ", h("span", { class: sheet.classes.BoldText }, luxon.DateTime.fromMillis(reward.dateExpires)
        .setLocale(luxonLocale(this.locale))
        .toLocaleString(luxon.DateTime.DATE_MED))))), reward.fuelTankCode && (h("div", null, this.fuelTankText, " ", h("span", { class: sheet.classes.BoldText }, reward.fuelTankCode))))));
    });
  }
};

export { ReferralTableRewardsCell as sqm_referral_table_rewards_cell };
