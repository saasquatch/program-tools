import { Component, h, Prop } from "@stencil/core";
import jss from "jss";
import preset from "jss-preset-default";
import { PresetText } from "../../../functional-components/PresetText";

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
  */

  render() {
    const style = {};

    jss.setup(preset());
    const sheet = jss.createStyleSheet(style);
    const styleString = sheet.toString();

    const getState = (states: Array<string>): string => {
      const possibleStates = [
        "REDEEMED",
        "EXPIRED",
        "CANCELLED",
        "PENDING",
        "AVAILABLE",
      ];

      if (states.length === 1) return states[0];

      for (let i = 0; i < possibleStates.length; i++) {
        const state = possibleStates[i];

        if (states.includes(state)) {
          return state;
        }
      }
    };

    const getSLBadgeType = (state: string): string => {
      switch (state) {
        case "REDEEMED":
          return "primary";
        case "EXPIRED":
          return "danger";
        case "CANCELLED":
          return "warning";
        case "PENDING":
          return "info";
        case "AVAILABLE":
          return "success";
      }
    };

    const toTitleCase = (state: string): string => {
      return state[0].toUpperCase() + state.slice(1).toLowerCase();
    };

    return this.rewards.map((reward) => {
      const state = getState(reward.statuses);
      const slBadgeType = getSLBadgeType(state);
      const badgeText = toTitleCase(state);

      return (
        <sl-details>
          <div slot="summary">
            {reward.prettyValue}{" "}
            <sl-badge type={slBadgeType} pill>
              {badgeText}
            </sl-badge>{" "}
            {/** future state badge if needed (probably only when the reward is set to expire automatically*/}
            {reward.dateExpires && (
              <sl-badge type="info" pill>
                Expiring in {reward.dateExpires}
              </sl-badge>
            )}
          </div>
          <div>
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
