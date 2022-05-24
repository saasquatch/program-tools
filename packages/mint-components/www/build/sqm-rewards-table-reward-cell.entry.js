import { r as registerInstance, h } from './index-832bd454.js';
import { i as intl } from './global-b1f18590.js';
import { c as createStyleSheet } from './JSS-f59933eb.js';
import './stencil-hooks.module-f4b05383.js';
import './index.module-b74a7f69.js';
import './extends-c31f1eff.js';
import './insertcss-d82cf6d6.js';

let RewardTableRewardsCell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  // TODO: value function from portalv2
  render() {
    intl.locale = this.locale;
    const style = {
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
        "padding-right": "var(--sl-spacing-x-small)",
        "&::part(header)": {
          padding: "var(--sl-spacing-x-small)",
          cursor: "default",
        },
        "&::part(content)": {
          padding: "var(--sl-spacing-x-small) var(--sl-spacing-medium)",
        },
        "&::part(base)": {
          opacity: "1",
        },
        "&::part(summary-icon)": {
          display: "flex",
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
    };
    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    const RewardValue = ({ reward }) => {
      var _a;
      console.log(reward);
      const pimpedPrettyValue = reward.unit === "CENTS"
        ? reward.prettyValue.replace(/USD/gi, "$")
        : (_a = reward.prettyValue) !== null && _a !== void 0 ? _a : "-";
      const singleReward = reward.prettyValueNumber === "1" && reward.prettyRedeemedNumber === "1";
      if (reward.type === "CREDIT" && !singleReward) {
        const progress = Math.round(((parseFloat(reward.prettyValueNumber) -
          parseFloat(reward.prettyRedeemedNumber)) /
          parseFloat(reward.prettyValueNumber)) *
          100);
        const progressBarSubtext = reward.statuses.includes("EXPIRED") ||
          reward.statuses.includes("CANCELLED") ? (h("div", null, intl.formatMessage({
          id: "redeemedText",
          defaultMessage: this.redeemedText,
        }, {
          redeemedAmount: reward.prettyRedeemedCredit,
        }))) : (h("div", null, intl.formatMessage({
          id: "availableText",
          defaultMessage: this.availableText,
        }, {
          availableAmount: reward.prettyAvailableValue,
        })));
        const style = {
          Progress: {
            height: "3px",
            width: "150px",
            margin: "var(--sl-spacing-xx-small) 0",
            background: "var(--sl-color-neutral-200)",
            "&:after": {
              content: '""',
              display: "block",
              background: "var(--sl-color-primary-300)",
              borderRadius: "100px",
              width: `${progress}%`,
              height: "100%",
            },
          },
          Container: {
            display: "inline-block",
            verticalAlign: "top",
            maxWidth: "100%",
            maxHeight: "60px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
          Text: {
            fontSize: "var(--sl-font-size-medium)",
            color: "var(--sl-color-gray-800)",
          },
          Subtext: {
            fontSize: "var(--sl-font-size-small)",
            color: "var(--sl-color-neutral-500)",
          },
        };
        const sheet = createStyleSheet(style);
        const styleString = sheet.toString();
        return (h("div", null, h("style", { type: "text/css" }, styleString), h("div", { class: sheet.classes.Container }, h("span", null, pimpedPrettyValue + " "), h("br", null), " ", h("div", { class: sheet.classes.Progress }), h("span", { class: sheet.classes.Subtext }, progressBarSubtext))));
      }
      return h("div", null, pimpedPrettyValue);
    };
    return (h("div", { style: { display: "contents" } }, h("style", { type: "text/css" }, styleString), h(RewardValue, { reward: this.reward })));
  }
};

export { RewardTableRewardsCell as sqm_rewards_table_reward_cell };
