import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqp-rewards-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() rewards: Reward[];

  render() {
    console.log({ rewards: this.rewards });
    return <div>my reward</div>;
  }
}
