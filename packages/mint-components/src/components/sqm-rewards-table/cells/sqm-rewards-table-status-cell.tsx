import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../../global/global";
import { createStyleSheet } from "../../../styling/JSS";
import { luxonLocale } from "../../../utils/utils";

const style = {
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
@Component({
  tag: "sqm-rewards-table-status-cell",
  shadow: true,
})
export class RewardTableStatusCell {
  @Prop() statusText: string;
  @Prop() reward: Reward;
  @Prop() expiryText: string = "Expires";
  @Prop() locale: string = "en";
  @Prop() pendingUsTax: string = "W-9 required";
  @Prop() pendingTaxReview: string = "Awaiting tax form review.";
  @Prop() pendingNewTaxForm: string =
    "Invalid tax form. Submit a new form to receive your rewards.";
  @Prop() pendingTaxSubmission: string =
    "Submit your tax documents to receive your rewards.";
  @Prop() pendingPartnerCreation: string =
    "Complete your tax and cash payout setup to receive your rewards.";
  @Prop() pendingScheduled: string = "Until";
  @Prop() pendingUnhandled: string = "Fulfillment error";
  @Prop() pendingReviewText: string = "Awaiting review";
  @Prop() deniedText: string = "Detected self-referral";
  @Prop() payoutFailed: string = "This payout will be retried on {date}";
  @Prop() payoutSent: string =
    "Payout process started on {date}. Expected payout on {date}.";

  rewardStatus(reward: Reward) {
    if (reward.referral?.fraudData?.moderationStatus === "DENIED")
      return "DENIED";
    if (reward.referral?.fraudData?.moderationStatus === "PENDING")
      return "PENDING_REVIEW";
    if (reward.dateCancelled) return "CANCELLED";
    if (reward.statuses && reward.statuses.includes("EXPIRED"))
      return "EXPIRED";
    if (reward.statuses && reward.statuses.includes("PENDING"))
      return "PENDING";
    if (reward.statuses.includes("PENDING_TAX_REVIEW"))
      return "PENDING_TAX_REVIEW";
    if (reward.statuses.includes("PENDING_NEW_TAX_FORM"))
      return "PENDING_NEW_TAX_FORM";
    if (reward.statuses.includes("PENDING_TAX_SUBMISSION"))
      return "PENDING_TAX_SUBMISSION";
    if (reward.statuses.includes("PENDING_PARTNER_CREATION"))
      return "PENDING_PARTNER_CREATION";
    if (reward.statuses.includes("PAYOUT_SENT")) return "PAYOUT_SENT";
    if (reward.statuses.includes("PAYOUT_FAILED")) return "PAYOUT_FAILED";
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

  getbadgeType(rewardStatus: string) {
    switch (rewardStatus) {
      case "AVAILABLE":
        return "success";
      case "REDEEMED":
      case "PAYOUT_SENT":
        return "primary";
      case "PENDING":
      case "PENDING_REVIEW":
      case "PENDING_TAX_REVIEW":
      case "PENDING_NEW_TAX_FORM":
      case "PENDING_TAX_SUBMISSION":
      case "PENDING_PARTNER_CREATION":
        return "warning";
      default:
        return "danger";
    }
  }

  getPayoutStatusText(rewardStatus: string) {
    switch (rewardStatus) {
      case "PAYOUT_SENT":
        return this.payoutSent;
      case "PAYOUT_FAILED":
        return this.payoutFailed;
      case "PENDING_TAX_REVIEW":
        return this.pendingTaxReview;
      case "PENDING_NEW_TAX_FORM":
        return this.pendingNewTaxForm;
      case "PENDING_TAX_SUBMISSION":
        return this.pendingTaxSubmission;
      case "PENDING_PARTNER_CREATION":
        return this.pendingPartnerCreation;
    }
  }

  render() {
    intl.locale = this.locale;

    const rewardStatus = this.rewardStatus(this.reward);
    const statusText = intl.formatMessage(
      { id: "statusMessage", defaultMessage: this.statusText },
      {
        status: rewardStatus,
      }
    );

    const badgeType = this.getbadgeType(rewardStatus);

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
        ?.setLocale(luxonLocale(luxonLocale(this.locale)))
        .toLocaleString(DateTime.DATE_MED)}`;

    const pendingReasons =
      rewardStatus === "PENDING" ? getRewardPendingReasons(this) : null;

    const fraudStatusText =
      rewardStatus === "PENDING_REVIEW"
        ? this.pendingReviewText
        : rewardStatus === "DENIED"
        ? this.deniedText
        : null;

    const payoutStatusText = this.getPayoutStatusText(rewardStatus);

    console.log(payoutStatusText);
    console.log(pendingReasons);

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
        <p class={sheet.classes.Date}>
          {pendingReasons || fraudStatusText || payoutStatusText || date}
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
            DateTime.fromMillis(prop.reward.dateScheduledFor)
              ?.setLocale(luxonLocale(luxonLocale(prop.locale || "en")))
              .toLocaleString(DateTime.DATE_MED),
        UNHANDLED_ERROR: prop.pendingUnhandled,
        SUSPECTED_FRAUD: prop.pendingReview,
        PENDING_TAX_REVIEW: prop.pendingTaxReview,
        PENDING_NEW_TAX_FORM: prop.pendingNewTaxForm,
        PENDING_TAX_SUBMISSION: prop.pendingTaxSubmission,
        PENDING_PARTNER_CREATION: prop.pendingPartnerCreation,
      };
      return [prop.reward.pendingReasons]
        .map((s: string): string => pendingCodeMap[s] ?? s)
        .join(", ");
    }
  }
}
