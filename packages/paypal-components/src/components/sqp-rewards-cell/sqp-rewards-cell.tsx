import { Component, h, Prop } from "@stencil/core";
import { DateTime } from "luxon";
import { intl } from "../../global/global";
import { luxonLocale } from "../../utils/utils";
import { createStyleSheet } from "../../styling/JSS";
import { TextSpanView } from "./text-span-view";
import { PaypalBadge } from "../../Icons/PaypalBadge";
import { supportedCurrencies } from "../sqp-status-column/mockRewardData";

const paypalStatuses = [
  "PAYPAL_PENDING",
  "SUCCESS",
  "FAILED",
  "IN_PROGRESS",
  "UNCLAIMED",
  "ONHOLD",
  "REFUNDED",
  "RETURNED",
  "REVERSED",
  "BLOCKED",
  "DENIED",
];

@Component({
  tag: "sqp-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];
  @Prop() hideDetails: boolean;
  @Prop() statusText: string;
  @Prop() statusLongText: string;
  @Prop() fuelTankText: string;
  @Prop() rewardReceivedText: string;
  @Prop() expiringText: string;
  @Prop() pendingForText: string;
  @Prop() rewardPaidOutText: string;
  @Prop() rewardPayoutInProgressText: string;
  @Prop() rewardPayoutFailedText: string;
  @Prop() rewardDeniedText: string;
  @Prop() locale: string = "en";
  @Prop() baseUnits: string[];

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

    if (
      reward.statuses?.includes("PENDING") &&
      reward.pendingReasons?.includes("US_TAX")
    ) {
      return "W9_PENDING";
    }

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
    const baseUnits = this.baseUnits;
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
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
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
          background: "var(--sl-color-blue-600)",
        },
      },
    };

    const sheet = createStyleSheet(style);
    const styleString = sheet.toString();

    const getSLBadgeType = (state: string, hasMeta: boolean): string => {
      const badgeType = hasMeta
        ? state === "SUCCESS"
          ? "primary"
          : state === "FAILED"
          ? "danger"
          : state === "PENDING" ||
            state === "W9_PENDING" ||
            state === "PAYPAL_PENDING" ||
            state === "UNCLAIMED" ||
            state === "ONHOLD"
          ? "warning"
          : state === "REFUNDED" ||
            state === "RETURNED" ||
            state === "REVERSED" ||
            state === "BLOCKED" ||
            state === "DENIED"
          ? "info"
          : "danger"
        : state === "AVAILABLE"
        ? "success"
        : state === "REDEEMED"
        ? "primary"
        : state === "PENDING" ||
          state === "PAYPAL_PENDING" ||
          state === "W9_PENDING"
        ? "warning"
        : "danger";
      return badgeType;
    };

    const getTimeDiff = (endTime: number): string => {
      // Current implementation only calculates the difference from current time
      // @ts-ignore
      return DateTime.fromMillis(endTime || 0)
        .setLocale(luxonLocale(this.locale))
        .toRelative()
        .replace("in", "")
        .trim();
    };

    return this.rewards?.map((reward) => {
      const hasMeta =
        !!reward?.meta?.customMeta?.rawPayPalInfo?.["transaction_status"];
      const state = this.rewardStatus(reward);

      const baseUnit = reward?.unit?.split("/")?.shift() as string;
      const isPayPal =
        paypalStatuses?.includes(state) ||
        hasMeta ||
        (baseUnits?.includes(baseUnit) &&
          supportedCurrencies.includes(reward.currency) &&
          ["PENDING", "AVAILABLE"].includes(state));

      const slBadgeType = getSLBadgeType(state, hasMeta);
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

      const RewardGivenText = () => {
        const customDate =
          state === "FAILED"
            ? reward.meta?.customMeta?.dateLastAttempted
            : state === "UNCLAIMED"
            ? DateTime.fromMillis(reward.meta?.customMeta?.dateLastUpdated || 0)
                .plus({ days: 30 })
                .toMillis()
            : state === "DENIED"
            ? DateTime.fromMillis(
                reward.meta?.customMeta?.dateLastAttempted || 0
              ).toMillis()
            : reward.meta?.customMeta?.dateLastUpdated || 0;

        return paypalStatuses.includes(state) ? (
          <div>
            <TextSpanView type="p">
              {intl.formatMessage(
                {
                  id: "statusLongMessage",
                  defaultMessage: this.statusLongText,
                },
                {
                  status: state,
                }
              )}{" "}
              <span class={sheet.classes.BoldText}>
                {DateTime.fromMillis(customDate)
                  .setLocale(luxonLocale(this.locale))
                  .toLocaleString(DateTime.DATE_MED)}
              </span>
            </TextSpanView>
          </div>
        ) : state === "FAILED" ? (
          <div>
            <TextSpanView type="p">
              {this.rewardPayoutFailedText}{" "}
              <span class={sheet.classes.BoldText}>
                {DateTime.fromMillis(
                  reward.meta?.customMeta?.dateLastAttempted ||
                    reward.meta?.customMeta?.dateFirstAttempted ||
                    0
                )
                  .setLocale(luxonLocale(this.locale))
                  .toLocaleString(DateTime.DATE_MED)}
              </span>
            </TextSpanView>
          </div>
        ) : (
          <div>
            <TextSpanView type="p">
              {this.rewardReceivedText}{" "}
              <span class={sheet.classes.BoldText}>
                {DateTime.fromMillis(reward.dateGiven || 0)
                  .setLocale(luxonLocale(this.locale))
                  .toLocaleString(DateTime.DATE_MED)}
              </span>
            </TextSpanView>
          </div>
        );
      };

      return (
        <sl-details class={sheet.classes.Details} disabled={this.hideDetails}>
          <style type="text/css">{styleString}</style>
          <div slot="summary" class={sheet.classes.DetailsContainer}>
            <TextSpanView type="p">
              <span class={sheet.classes.BoldText}>{reward.prettyValue}</span>
            </TextSpanView>
            {/* If state is pending and reward has expiry date, display the relative time inside badge. Otherwise only display the badge text */}
            {/* Pending for W9 Tax reasons cases here */}
            <div class={sheet.classes.BadgeContainer}>
              {state === "PENDING" && reward.dateScheduledFor ? (
                <sl-badge
                  class={
                    slBadgeType === "primary"
                      ? sheet.classes.RedeemBadge
                      : sheet.classes.StatusBadge
                  }
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
                  class={
                    slBadgeType === "primary"
                      ? sheet.classes.RedeemBadge
                      : sheet.classes.StatusBadge
                  }
                  type={slBadgeType}
                  pill
                >
                  {badgeText}
                </sl-badge>
              )}
              {reward.dateExpires && state === "AVAILABLE" && (
                <sl-badge
                  class={
                    slBadgeType === "primary"
                      ? sheet.classes.RedeemBadge
                      : sheet.classes.StatusBadge
                  }
                  type="info"
                  pill
                >
                  {this.expiringText}
                  {` ${getTimeDiff(reward.dateExpires)}`}
                </sl-badge>
              )}
              {isPayPal && <PaypalBadge />}
            </div>
          </div>
          <div>
            {reward.dateGiven && <RewardGivenText />}
            {state === "EXPIRED" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText}>
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
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateCancelled)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "W9_PENDING" && (
              <div>
                <TextSpanView type="p">{statusText}</TextSpanView>
              </div>
            )}
            {state === "PENDING" && reward.dateScheduledFor && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateScheduledFor)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "AVAILABLE" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  {statusText}{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateExpires || 0)
                      .setLocale(luxonLocale(this.locale))
                      .toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}
            {reward.fuelTankCode && (
              <div>
                {this.fuelTankText}{" "}
                <span class={sheet.classes.BoldText}>
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
