import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
// import { PresetText } from "../../../functional-components/PresetText";
import { DateTime } from "luxon";
@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];

  /* 
    TODO LIST: 
    - Add styling
    - Ensure that expiring badge is the correct color, if not add functionality to get that
    - Colors EXPIRED & CANCELLED should be danger, PENDING is warning, AVAILABLE is success
    - EXPIRING in x days will be info
    - Add dates 
    - Should colors be dynamic for the expiring badge?
  */

  render() {
    // const style = {};

    jss.setup(preset());
    // const sheet = jss.createStyleSheet(style);
    // const styleString = sheet.toString();

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

    const getTimeDiff = (startTime: any, endTime: number): any => {
      // Current implementation only calculates the difference from current time
      const diff = DateTime.fromMillis(endTime).toRelativeCalendar();
      return diff;
    };

    return this.rewards.map((reward) => {
      const state = getState(reward.statuses);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = toTitleCase(state);
      const relativeTime = reward.dateExpires
        ? getTimeDiff(reward.dateGiven, reward.dateExpires)
        : null;
      console.log(relativeTime);
      return (
        <sl-details>
          {/* STYLE TAG HERE */}
          <div slot="summary">
            {reward.prettyValue}{" "}
            {state === "PENDING" && reward.dateExpires ? (
              <sl-badge type={slBadgeType} pill>{`${badgeText} ${
                relativeTime === "tomorrow" || relativeTime === "today"
                  ? `until ${relativeTime}`
                  : `for ${relativeTime}`
              }`}</sl-badge>
            ) : (
              <sl-badge type={slBadgeType} pill>
                {badgeText}
              </sl-badge>
            )}
            {reward.dateExpires && state === "AVAILABLE" && (
              <sl-badge type="info" pill>
                {relativeTime === "tomorrow" || relativeTime === "today"
                  ? `Expiring ${relativeTime}`
                  : `Expiring in ${relativeTime}`}
              </sl-badge>
            )}
          </div>
          <div>
            {/* Pending will check difference between current date and dateScheduledFor to get days amount*/}
            <p>Date received: {reward.dateGiven}</p>
            {reward.fuelTankCode && <p>Code: {reward.fuelTankCode}</p>}
            {state === "PENDING" && <p>Code: {reward.dateGiven}</p>}{" "}
            {/* Should this be a different date? */}
            {state === "AVAILABLE" && reward.dateExpires && (
              <p>Date Expiring: {reward.dateExpires}</p>
            )}
          </div>
        </sl-details>
      );
    });
  }
}
