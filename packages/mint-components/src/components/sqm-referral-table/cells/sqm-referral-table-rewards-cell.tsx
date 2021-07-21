import { Component, h, Prop } from "@stencil/core";
import { PresetText } from "../../../functional-components/PresetText";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];

  render() {

    const possibleStates = ["REDEEMED", "EXPIRED", "CANCELLED", "PENDING", "AVAILABLE"]

    const getState = (states : Array<string>) =>{
      // possibleStates.forEach
    }

    // use sl-badge in pill mode for badges

    return this.rewards.map((reward) => (
      <sl-details>
        <div slot="summary">
          {reward.prettyValue} {/** current state badge */}{" "}
          {/** future state badge if needed (probably only when the reward is set to expire automatically*/}
        </div>
        <div>
          <p>Date received: {reward.dateGiven}</p>
          {reward.fuelTankCode && <p>Code: {reward.fuelTankCode}</p>}
        </div>
      </sl-details>
    ));
  }
}
