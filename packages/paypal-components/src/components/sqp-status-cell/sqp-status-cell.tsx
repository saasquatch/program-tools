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
      background: "var(--sl-color-blue-500)",
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

const paypalStatuses = [
  "FAILED",
  "UNCLAIMED",
  "SUCCESS",
  "REFUNDED",
  "RETURNED",
  "REVERSED",
  "BLOCKED",
  "ONHOLD",
];

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
  @Prop() rewardPaidOutText: string = "Paid out on";
  @Prop() rewardPayoutFailedText: string =
    "This payout will be retried up to 3 times. If it still fails it will be retried in the next payout cycle. Last attempted on";
  @Prop() rewardUnclaimedText: string =
    "The email you provided does not link to an exisiting PayPal account. Payout expires on";

  @Prop() rewardPayoutInProgressText: string = "Payout process started on";
  @Prop() rewardOnHoldText: string = "Payout on hold and in review since";
  @Prop() rewardRefundedText: string = "Payout refunded on";
  @Prop() rewardReturnedText: string =
    "The email you provided does not link to an exisiting PayPal account. Payout expired on";
  @Prop() rewardReversedText: string = "Payout reversed on";
  @Prop() rewardBlockedText: string = "Payout blocked on";
  @Prop() rewardDeniedText: string = "";

  rewardStatus(reward: Reward) {
    const paypalStatus =
      reward?.meta?.customMeta?.rawPayPalInfo?.["transaction_status"];

    const metaStatus = reward?.meta?.status;

    if (metaStatus === "ERROR" && !paypalStatus) return "FAILED";
    if (metaStatus === "IN_PROGRESS" && !paypalStatus) return "PAYPAL_PENDING";

    if (paypalStatus === "PENDING") return "PAYPAL_PENDING";
    if (paypalStatus) return paypalStatus;
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
    intl.locale = this.locale;

    const hasMeta =
      !!this.reward?.meta?.customMeta?.rawPayPalInfo?.["transaction_status"];

    const rewardStatus = this.rewardStatus(this.reward);

    const statusText = intl.formatMessage(
      { id: "statusMessage", defaultMessage: this.statusText },
      {
        status: rewardStatus,
      }
    );

    // | SUCCESS   | Paid out    | Blue       |
    // | FAILED    | Failed      | Red        |
    // | PENDING   | In progress | Orange     |
    // | UNCLAIMED | Unclaimed   | Orange     |
    // | ONHOLD    | In progress | Orange     |
    // | REFUNDED  | Refunded    | grey       |
    // | RETURNED  | Returned    | grey       |
    // | REVERSED  | Reversed    | grey       |
    // | BLOCKED   | Blocked     | grey       |

    // const badgeType =
    const badgeType = hasMeta
      ? rewardStatus === "SUCCESS"
        ? "primary"
        : rewardStatus === "FAILED"
        ? "danger"
        : rewardStatus === "PAYPAL_PENDING" ||
          rewardStatus === "UNCLAIMED" ||
          rewardStatus === "ONHOLD"
        ? "warning"
        : rewardStatus === "REFUNDED" ||
          rewardStatus === "RETURNED" ||
          rewardStatus === "REVERSED" ||
          rewardStatus === "BLOCKED" ||
          rewardStatus === "DENIED"
        ? "info"
        : "danger"
      : rewardStatus === "AVAILABLE"
      ? "success"
      : rewardStatus === "REDEEMED"
      ? "primary"
      : rewardStatus === "PENDING"
      ? "warning"
      : "danger";

    console.log({
      reward: this.reward,
      rewardStatus,
      message: this.statusText,
      badgeType,
    });

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
      }${DateTime.fromMillis(dateShown || 0)
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const unClaimed =
      rewardStatus === "UNCLAIMED" &&
      `${this.rewardUnclaimedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        .plus({ days: 30 })
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const payoutDenied =
      rewardStatus === "DENIED" &&
      `${this.rewardDeniedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastAttempted || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const payoutFailed =
      rewardStatus === "FAILED" &&
      `${this.rewardPayoutFailedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta?.dateLastAttempted ||
          this.reward.meta?.customMeta?.dateFirstAttempted ||
          0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const pendingReasons =
      rewardStatus === "PENDING" ? getRewardPendingReasons(this) : null;

    const paidOut =
      rewardStatus === "SUCCESS" &&
      `${this.rewardPaidOutText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const inProgress =
      rewardStatus === "PAYPAL_PENDING" &&
      `${this.rewardPayoutInProgressText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const onHold =
      rewardStatus === "ONHOLD" &&
      `${this.rewardOnHoldText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const refunded =
      rewardStatus === "REFUNDED" &&
      `${this.rewardRefundedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const returned =
      rewardStatus === "RETURNED" &&
      `${this.rewardReturnedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        .plus({ days: 30 })
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const reversed =
      rewardStatus === "REVERSED" &&
      `${this.rewardReversedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const blocked =
      rewardStatus === "BLOCKED" &&
      `${this.rewardBlockedText + " "}${DateTime.fromMillis(
        this.reward.meta?.customMeta.dateLastUpdated || 0
      )
        ?.setLocale(luxonLocale(this.locale))
        .toLocaleString(DateTime.DATE_MED)}.`;

    const isPayPal = hasMeta;

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

        <p class={sheet.classes.Date}>
          {payoutFailed ||
            pendingReasons ||
            unClaimed ||
            refunded ||
            onHold ||
            returned ||
            inProgress ||
            reversed ||
            blocked ||
            payoutDenied ||
            paidOut ||
            date}
        </p>
      </div>
    );

    function getRewardPendingReasons(prop) {
      const pendingCodeMap: { [code: string]: string } = {
        US_TAX: prop.pendingUsTax,
        SCHEDULED:
          prop.reward.dateScheduledFor &&
          prop.pendingScheduled +
            " " +
            DateTime.fromMillis(prop.reward.dateScheduledFor || 0)
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
