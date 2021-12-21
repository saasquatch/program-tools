import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../../global/global";
import jss from "jss";
import preset from "jss-preset-default";

@Component({
  tag: "sqm-rewards-table-status-cell",
  shadow: true,
})
export class RewardTableStatusCell {
  @Prop() statusText: string;
  @Prop() reward: Reward;

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

      Date: {
        fontSize: "var(--sl-font-size-small)",
        margin: "0",
        color: "var(--sl-color-neutral-500)",
      },
    };

    jss.setup(preset());
    const sheet = jss.createStyleSheet(style);
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
        : "error";

    const dateShown =
      this.reward.dateCancelled ||
      this.reward.dateExpires ||
      this.reward.dateRedeemed ||
      "";

    const date =
      dateShown &&
      // TODO: this text needs to be a prop for translations
      `${this.reward.dateExpires ? "Expires on " : ""}${DateTime.fromMillis(
        dateShown
      )?.toLocaleString(DateTime.DATE_MED)}`;

    return (
      <div style={{ display: "contents" }}>
        <style type="text/css">{styleString}</style>
        <sl-badge type={badgeType} pill class={sheet.classes.Badge}>
          {statusText}
        </sl-badge>
        <p class={sheet.classes.Date}>{date}</p>
      </div>
    );
  }
}
