import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";

@Component({
  tag: "sqm-rewards-table-status-cell",
  shadow: true,
})
export class RewardTableStatusCell {
  @Prop() statusText: string;
  @Prop() reward: Reward;
  @Prop() expiryText: string;

  rewardStatus(reward: Reward) {
    if (reward.dateCancelled) return "CANCELLED";
    if (reward.statuses && reward.statuses.includes("EXPIRED"))
      return "EXPIRED";
    if (reward.statuses && reward.statuses.includes("PENDING"))
      return "PENDING";
    if (reward.type === "CREDIT") {
      if (reward.statuses.includes("REDEEMED")) return "REDEEMED";
      return "AVAILABLE";
    }
    if (reward.type === "PCT_DISCOUNT") {
      if (reward.statuses.includes("AVAILABLE")) return "AVAILABLE";
    }

    if (reward.type === "INTEGRATION" || reward.type === "FUELTANK") {
      if (reward.statuses && reward.statuses.includes("PENDING"))
        return "PENDING";
      if (reward.statuses && reward.statuses.includes("CANCELLED"))
        return "CANCELLED";
      if (reward.statuses.includes("AVAILABLE")) return "AVAILABLE";
    }

    return "";
  }

  render() {
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
    const statusText = intl.formatMessage(
      { id: "statusMessage", defaultMessage: this.statusText },
      {
        status: rewardStatus,
      }
    );

    const badgeType =
      rewardStatus === "AVAILABLE"
        ? "success"
        : rewardStatus === "REDEEMED"
        ? "primary"
        : rewardStatus === "PENDING"
        ? "warning"
        : "danger";

    const dateShown =
      this.reward.dateCancelled ||
      this.reward.dateExpires ||
      this.reward.dateRedeemed ||
      "";

    const date =
      dateShown &&
      `${
        rewardStatus === "AVAILABLE" && this.reward.dateExpires
          ? this.expiryText + " "
          : ""
      }${DateTime.fromMillis(dateShown)?.toLocaleString(DateTime.DATE_MED)}`;

    return (
      <div style={{ display: "contents" }}>
        <style type="text/css">{styleString}</style>
        <sl-badge
          type={badgeType}
          pill
          class={
            rewardStatus === "REDEEMED"
              ? sheet.classes.RedeemBadge
              : sheet.classes.Badge
          }
        >
          {statusText}
        </sl-badge>
        <p class={sheet.classes.Date}>{date}</p>
      </div>
    );
  }
}
