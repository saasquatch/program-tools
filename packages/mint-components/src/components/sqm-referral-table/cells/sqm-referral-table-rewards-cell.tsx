import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
import { createStyleSheet } from "../../../styling/JSS";
import { intl } from "../../../global/global";
import { luxonLocale } from "../../../utils/utils";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];
  @Prop() taxConnection: ImpactConnection;
  @Prop() hideDetails: boolean;
  @Prop() statusText: string =
    "{status, select, AVAILABLE {Available} CANCELLED {Cancelled} PENDING {Pending} PENDING_REVIEW {Pending} PAYOUT_APPROVED {Payout Approved} PAYOUT_FAILED {Payout Failed} PAYOUT_CANCELLED {Payout Cancelled} PENDING_TAX_REVIEW {Pending} PENDING_NEW_TAX_FORM {Pending} PENDING_TAX_SUBMISSION {Pending} PENDING_PARTNER_CREATION {Pending} DENIED {Denied} EXPIRED {Expired} REDEEMED {Redeemed} other {Not available} }";
  @Prop() statusLongText: string =
    "{status, select, AVAILABLE {Reward expiring on} CANCELLED {Reward cancelled on} PENDING {Available on} PENDING_REVIEW {Pending since} PAYOUT_APPROVED {Reward approved for payout and was scheduled for payment based on your settings.} PAYOUT_FAILED {Payout failed due to a fulfillment issue and is currently being retried.} PAYOUT_CANCELLED {If you think this is a mistake, contact our Support team.} PENDING_TAX_REVIEW {Awaiting tax form review} PENDING_NEW_TAX_FORM {Invalid tax form. Submit a new form to receive your rewards.} PENDING_TAX_SUBMISSION {Submit your tax documents to receive your rewards} PENDING_PARTNER_CREATION {Complete your tax and cash payout setup to receive your rewards} DENIED {Denied on} EXPIRED {Reward expired on} other {Not available} }";
  @Prop() fuelTankText: string;
  @Prop() rewardReceivedText: string;
  @Prop() expiringText: string;
  @Prop() pendingForText: string;
  @Prop() deniedHelpText: string;
  @Prop() locale: string = "en";
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
        "max-width": "500px",
        "&::part(header)": {
          padding: "var(--sl-spacing-x-small)",
          cursor: `${this.hideDetails ? "default" : "pointer"}`,
        },
        "&::part(content)": {
          padding: "var(--sl-spacing-x-small) var(--sl-spacing-medium)",
        },
        "&::part(base)": {
          border: "1px solid var(--sqm-border-color)",
          opacity: "1",
        },
        "&::part(summary-icon)": {
          display: `${this.hideDetails ? "none" : "flex"}`,
        },

        "&::part(summary-icon[open])": {
          transform: "rotate(-90deg)",
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
        "&::part(base)": {
          textAlign: "center",
          maxWidth: "170px",
          whiteSpace: "pre-line",
        },
      },
      RedeemBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
        "&::part(base)": {
          textAlign: "center",
          maxWidth: "170px",
          whiteSpace: "pre-line",
          background: "var(--sqm-informative-color-background)",
          color: "var(--sqm-informative-color-text)",
        },
      },
      DangerBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
        "&::part(base)": {
          textAlign: "center",
          maxWidth: "170px",
          whiteSpace: "pre-line",
          background: "var(--sqm-danger-color-background)",
          color: "var(--sqm-danger-color-text)",
        },
      },
      WarningBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
        "&::part(base)": {
          textAlign: "center",
          maxWidth: "170px",
          whiteSpace: "pre-line",
          background: "var(--sqm-warning-color-background)",
          color: "var(--sqm-warning-color-text)",
        },
      },
      SuccessBadge: {
        paddingLeft: "var(--sl-spacing-xxx-small)",
        "&::part(base)": {
          textAlign: "center",
          maxWidth: "170px",
          whiteSpace: "pre-line",
          background: "var(--sqm-success-color-background)",
          color: "var(--sqm-success-color-text)",
        },
      },
    };

    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();
    type ShoeLaceBadgeType =
      | "primary"
      | "danger"
      | "warning"
      | "success"
      | "info";

    const getBadgeCSSClass = (badgeType: ShoeLaceBadgeType): string => {
      switch (badgeType) {
        case "primary":
          return sheet.classes.RedeemBadge;

        case "danger":
          return sheet.classes.DangerBadge;

        case "success":
          return sheet.classes.SuccessBadge;

        case "warning":
        case "info":
          return sheet.classes.WarningBadge;

        default:
          return sheet.classes.WarningBadge;
      }
    };

    const getState = (
      reward: Reward,
      taxConnection: ImpactConnection
    ): string => {
      const possibleStates = [
        "REDEEMED",
        "CANCELLED",
        "EXPIRED",
        "PENDING",
        "AVAILABLE",
        "PENDING_REVIEW",
        "DENIED",
        "PAYOUT_APPROVED",
        "PAYOUT_CANCELLED",
        "PAYOUT_FAILED",
        "PENDING_TAX_REVIEW",
        "PENDING_NEW_TAX_FORM",
        "PENDING_TAX_SUBMISSION",
        "PENDING_PARTNER_CREATION",
      ];

      if (reward.referral?.fraudData?.moderationStatus !== "APPROVED") {
        if (reward.referral?.fraudData?.moderationStatus === "PENDING")
          return "PENDING_REVIEW";
        if (reward.referral?.fraudData?.moderationStatus === "DENIED")
          return "DENIED";
      }

      const partnerFundsStatus = reward.partnerFundsTransfer?.status;
      if (
        partnerFundsStatus === "NOT_YET_DUE" ||
        partnerFundsStatus === "TRANSFERRED"
      ) {
        return "PAYOUT_APPROVED";
      } else if (partnerFundsStatus === "OVERDUE") return "PAYOUT_FAILED";
      else if (partnerFundsStatus === "REVERSED") return "PAYOUT_CANCELLED";

      if (reward?.pendingReasons?.includes("US_TAX")) {
        if (!taxConnection?.taxHandlingEnabled) return "PENDING";
        if (!taxConnection?.connected) return "PENDING_PARTNER_CREATION";
        if (taxConnection?.publisher?.requiredTaxDocumentType) {
          if (!taxConnection?.publisher?.currentTaxDocument)
            return "PENDING_TAX_SUBMISSION";

          const status = taxConnection.publisher.currentTaxDocument.status;
          if (status === "INACTIVE") return "PENDING_NEW_TAX_FORM";
          if (status === "NOT_VERIFIED") return "PENDING_TAX_REVIEW";
        }
        if (!taxConnection?.publisher?.withdrawalSettings)
          return "PENDING_PARTNER_CREATION";
      }
      if (reward?.pendingReasons?.includes("PAYOUT_CONFIGURATION_MISSING")) {
        return "PENDING_PARTNER_CREATION";
      }

      if (reward.statuses.length === 1) return reward.statuses[0];

      return possibleStates.find(
        (state) => reward.statuses.includes(state) && state
      );
    };

    const getSLBadgeType = (state: string): ShoeLaceBadgeType => {
      switch (state) {
        case "REDEEMED":
        case "PAYOUT_APPROVED":
          return "primary";
        case "DENIED":
        case "EXPIRED":
        case "CANCELLED":
        case "PAYOUT_FAILED":
        case "PAYOUT_CANCELLED":
          return "danger";
        case "PENDING":
        case "PENDING_REVIEW":
        case "PENDING_TAX_REVIEW":
        case "PENDING_NEW_TAX_FORM":
        case "PENDING_TAX_SUBMISSION":
        case "PENDING_PARTNER_CREATION":
          return "warning";
        case "AVAILABLE":
          return "success";
      }
    };

    const getTimeDiff = (endTime: number): string => {
      // Current implementation only calculates the difference from current time
      return DateTime.fromMillis(endTime)
        .setLocale(luxonLocale(this.locale))
        .toRelative()
        .replace("in", "")
        .trim();
    };

    return this.rewards?.map((reward) => {
      const state = getState(reward, this.taxConnection);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = intl.formatMessage(
        { id: "statusShortMessage", defaultMessage: this.statusText },
        {
          status: state,
        }
      );
      const statusText = intl.formatMessage(
        {
          id: "statusLongMessage",
          defaultMessage: this.statusLongText,
        },
        {
          status: state,
        }
      );

      return (
        <sl-details class={sheet.classes.Details} disabled={this.hideDetails}>
          <style type="text/css">{styleString}</style>
          <div slot="summary" class={sheet.classes.DetailsContainer}>
            <TextSpanView type="p">
              <span part="sqm-cell-value" class={sheet.classes.BoldText}>
                {reward.prettyValue}
              </span>
            </TextSpanView>
            {/* If state is pending and reward has expiry date, 
            display the relative time inside badge. 
            Otherwise only display the badge text */}
            {/* Pending for W9 Tax reasons cases here */}
            <div class={sheet.classes.BadgeContainer}>
              {state === "PENDING" && reward.dateScheduledFor ? (
                <sl-badge
                  class={getBadgeCSSClass(slBadgeType)}
                  type={slBadgeType}
                  pill
                >
                  {intl.formatMessage(
                    {
                      id: "pendingForText",
                      defaultMessage: this.pendingForText,
                    },
                    {
                      status: badgeText,
                      date: getTimeDiff(reward.dateScheduledFor),
                    }
                  )}
                </sl-badge>
              ) : (
                <sl-badge
                  class={getBadgeCSSClass(slBadgeType)}
                  type={slBadgeType}
                  pill
                >
                  {badgeText}
                </sl-badge>
              )}
              {reward.dateExpires && state === "AVAILABLE" && (
                <sl-badge
                  class={getBadgeCSSClass(slBadgeType)}
                  type="info"
                  pill
                >
                  {this.expiringText}
                  {` ${getTimeDiff(reward.dateExpires)}`}
                </sl-badge>
              )}
            </div>
          </div>
          <div>
            {state === "PENDING_REVIEW" && reward.referral?.dateModerated && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.referral.dateModerated)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "PAYOUT_APPROVED" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PAYOUT_FAILED" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PAYOUT_CANCELLED" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PENDING_TAX_REVIEW" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PENDING_NEW_TAX_FORM" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PENDING_TAX_SUBMISSION" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PENDING_PARTNER_CREATION" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "DENIED" && reward.referral?.dateModerated && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.referral.dateModerated)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                  .{this.deniedHelpText ? ` ${this.deniedHelpText}` : ``}
                </TextSpanView>
              </div>
            )}
            {reward.dateGiven && (
              <div>
                <TextSpanView type="p">
                  {this.rewardReceivedText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.dateGiven)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "EXPIRED" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.dateExpires)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "CANCELLED" && reward.dateCancelled && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.dateCancelled)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "PENDING" && reward.dateScheduledFor && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.dateScheduledFor)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}{" "}
            {/* Pending for W9 Tax reasons cases here */}
            {state === "AVAILABLE" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText} part="sqm-cell-value">
                    {DateTime.fromMillis(reward.dateExpires)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {reward.fuelTankCode && (
              <div>
                {this.fuelTankText}{" "}
                <span class={sheet.classes.BoldText} part="sqm-cell-value">
                  {reward.fuelTankCode}
                </span>
              </div>
            )}
          </div>
        </sl-details>
      );
    });
  }
}
