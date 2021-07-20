import { Component, h, Prop } from "@stencil/core";
import { PresetText } from "../../../functional-components/PresetText";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];

  render() {
    return this.rewards.map((reward) => (
      <PresetText type="p">{reward.prettyValue}</PresetText>
    ));
  }
}
