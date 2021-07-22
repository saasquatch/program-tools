import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { DateTime, Duration } from "luxon";
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
      // console.log(DateTime.now().plus({ days: 6 }).toRelativeCalendar());
      // console.log(Duration.fromMillis(1000));
      // console.log(DateTime.now().diff(DateTime.local()));
      // const start = DateTime.now();

      const end = startTime.plus(endTime);
      const diff = end.diff(startTime, "days");
      // console.log(diff);
      // return diff.shiftTo("days").toObject();
      // return diff.shiftTo("days").days;
    };

    console.log(getTimeDiff(DateTime.now(), 1000000000));

    return this.rewards.map((reward) => {
      const state = getState(reward.statuses);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = toTitleCase(state);

      return (
        <sl-details>
          {/* STYLE TAG HERE */}
          <div slot="summary">
            {reward.prettyValue}{" "}
            {state === "PENDING" && reward.dateExpires ? (
              <sl-badge
                type={slBadgeType}
                pill
              >{`${badgeText} for x days`}</sl-badge>
            ) : (
              <sl-badge type={slBadgeType} pill>
                {badgeText}
              </sl-badge>
            )}
            {/* If pending append the days remaing on the end*/}
            {/** future state badge if needed (probably only when the reward is set to expire automatically*/}
            {reward.dateExpires && state !== "PENDING" && (
              <sl-badge type="info" pill>
                Expiring in {reward.dateExpires}
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
