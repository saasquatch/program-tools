import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../global/global";
import { PaypalBadge } from "../../Icons/PaypalBadge";
import { createStyleSheet } from "../../styling/JSS";
import { luxonLocale } from "../../utils/utils";

const style = {
  BadgeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "12px",
  },
  Badge: {
    "&::part(base)": {
      fontSize: "var(--sl-font-size-small)",
      padding: "4px 8px",
      paddingLeft: "10px",
      whiteSpace: "pre-line",
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

const paypalStatuses = ["TRANSFERRED", "FAILED", "INPROGRESS"];

@Component({
  tag: "sqp-status-cell",
  shadow: true,
})
export class RewardTableStatusCell {
  @Prop() statusText: string;
  @Prop() reward: Reward;
  @Prop() expiryText: string = "Expires";
  @Prop() locale: string = "en";
  @Prop() pendingUsTax: string = "W-9 required";
  @Prop() pendingScheduled: string = "Until";
  @Prop() pendingUnhandled: string = "Fulfillment error";

  rewardStatus(reward: Reward) {
    console.log({ reward });
    if (reward.dateCancelled) return "CANCELLED";
    if (reward.statuses && reward.statuses.includes("EXPIRED"))
      return "EXPIRED";
    if (reward.statuses && reward.statuses.includes("PENDING"))
      return "PENDING";
    if (
      reward.meta?.customMeta?.datePaidOut &&
      reward.statuses.includes("REDEEMED")
    ) {
      return "TRANSFERRED";
    }
    if (reward.meta?.status === "ERROR") {
      return "FAILED";
    }
    if (
      reward.meta?.customMeta?.dateLastAttempted &&
      !reward.meta?.customMeta?.datePaidOut
    ) {
      return "INPROGRESS";
    }
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
    intl.locale = this.locale;

    const rewardStatus = this.rewardStatus(this.reward);
    console.log({
      reward: this.reward,
      rewardStatus,
      message: this.statusText,
    });
    const statusText = intl.formatMessage(
      { id: "statusMessage", defaultMessage: this.statusText },
      {
        status: rewardStatus,
      }
    );

    const badgeType =
      rewardStatus === "AVAILABLE"
        ? "success"
        : rewardStatus === "REDEEMED" || rewardStatus === "TRANSFERRED"
        ? "primary"
        : rewardStatus === "PENDING" || rewardStatus === "INPROGRESS"
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
      }${DateTime.fromMillis(dateShown)
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}`;

    const pendingReasons =
      rewardStatus === "PENDING" ? getRewardPendingReasons(this) : null;

    const isPayPal = paypalStatuses.includes(rewardStatus);

    return (
      <div style={{ display: "contents" }}>
        <style type="text/css">{styleString}</style>
        <div class={sheet.classes.BadgeContainer}>
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
          {isPayPal && <PaypalBadge />}
        </div>

        <p class={sheet.classes.Date}>{pendingReasons || date}</p>
      </div>
    );

    function getRewardPendingReasons(prop) {
      const pendingCodeMap: { [code: string]: string } = {
        US_TAX: prop.pendingUsTax,
        SCHEDULED:
          prop.reward.dateScheduledFor &&
          prop.pendingScheduled +
            " " +
            DateTime.fromMillis(prop.reward.dateScheduledFor)
              ?.setLocale(luxonLocale(prop.locale || "en"))
              .toLocaleString(DateTime.DATE_MED),
        UNHANDLED_ERROR: prop.pendingUnhandled,
      };
      return [prop.reward.pendingReasons]
        .map((s: string): string => pendingCodeMap[s] ?? s)
        .join(", ");
    }
  }
}
