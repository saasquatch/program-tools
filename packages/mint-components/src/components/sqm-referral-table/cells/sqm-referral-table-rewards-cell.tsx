import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { DateTime } from "luxon";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";
@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];
  @Prop() hideDetails: boolean;
  render() {
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
      },

      BadgeContainer: {
        "& > :not(:last-child)": {
          "margin-right": "var(--sl-spacing-x-small)",
        },
      },

      BoldText: {
        "font-weight": "var(--sl-font-weight-semibold)",
      },
    };

    jss.setup(preset());
    const sheet = jss.createStyleSheet(style);
    const styleString = sheet.toString();

    const getState = (states: Array<string>): string => {
      const possibleStates = [
        "REDEEMED",
        "CANCELLED",
        "EXPIRED",
        "PENDING",
        "AVAILABLE",
      ];

      if (states.length === 1) return states[0];

      return possibleStates.find((state) => states.includes(state) && state);
    };

    const getSLBadgeType = (state: string): string => {
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

    const toTitleCase = (state: string): string => {
      return state[0].toUpperCase() + state.slice(1).toLowerCase();
    };

    const getTimeDiff = (endTime: number): string => {
      // Current implementation only calculates the difference from current time
      const diff = DateTime.fromMillis(endTime)
        .toRelativeCalendar()
        .replace("in", "")
        .trim();
      return diff;
    };

    return this.rewards.map((reward) => {
      const state = getState(reward.statuses);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = toTitleCase(state);

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
              {state === "PENDING" &&
              reward.dateScheduledFor &&
              reward.dateExpires ? (
                <sl-badge type={slBadgeType} pill>{`${badgeText} ${
                  getTimeDiff(reward.dateScheduledFor) === "tomorrow" ||
                  getTimeDiff(reward.dateScheduledFor) === "today" ||
                  getTimeDiff(reward.dateExpires) === "next month" ||
                  getTimeDiff(reward.dateExpires) === "next year"
                    ? `until ${getTimeDiff(reward.dateScheduledFor)}`
                    : `for ${getTimeDiff(reward.dateScheduledFor)}`
                }`}</sl-badge>
              ) : (
                <sl-badge type={slBadgeType} pill>
                  {badgeText}
                </sl-badge>
              )}
              {reward.dateExpires && state === "AVAILABLE" && (
                <sl-badge type="info" pill>
                  {getTimeDiff(reward.dateExpires) === "tomorrow" ||
                  getTimeDiff(reward.dateExpires) === "today" ||
                  getTimeDiff(reward.dateExpires) === "next month" ||
                  getTimeDiff(reward.dateExpires) === "next year"
                    ? `Expiring ${getTimeDiff(reward.dateExpires)}`
                    : `Expiring in ${getTimeDiff(reward.dateExpires)}`}
                </sl-badge>
              )}
            </div>
          </div>
          <div>
            {reward.dateGiven && (
              <div>
                <TextSpanView type="p">
                  Reward received on{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateGiven).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "EXPIRED" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  Reward expired on{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateExpires).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "CANCELLED" && reward.dateCancelled && (
              <div>
                <TextSpanView type="p">
                  Reward cancelled on{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateCancelled).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </span>
                </TextSpanView>
              </div>
            )}
            {state === "PENDING" && reward.dateScheduledFor && (
              <div>
                <TextSpanView type="p">
                  Available On{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(
                      reward.dateScheduledFor
                    ).toLocaleString(DateTime.DATE_MED)}
                  </span>
                </TextSpanView>
              </div>
            )}{" "}
            {/* Pending for W9 Tax reasons cases here */}
            {state === "AVAILABLE" && reward.dateExpires && (
              <div>
                <TextSpanView type="p">
                  Reward expiring on{" "}
                  <span class={sheet.classes.BoldText}>
                    {DateTime.fromMillis(reward.dateExpires).toLocaleString(
                      DateTime.DATE_MED
                    )}
                  </span>
                </TextSpanView>
              </div>
            )}
            {reward.fuelTankCode && (
              <div>
                <TextSpanView type="p">
                  Your code is{" "}
                  <span class={sheet.classes.BoldText}>
                    {reward.fuelTankCode}
                  </span>
                </TextSpanView>
              </div>
            )}
          </div>
        </sl-details>
      );
    });
  }
}
