import { Component, h, Prop } from "@stencil/core";
import { PresetText } from "../../../functional-components/PresetText";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() reward: string;

  render() {
    return <PresetText type="p">{this.reward}</PresetText>;
  }
}
