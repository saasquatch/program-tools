import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqp-reward-cell",
  shadow: true,
})
export class ReferralTableRewardsCell {
  @Prop() referral: any;

  render() {
    const reward = this.referral?.rewards?.pop();
    if (!reward) return <div>No paypal reward</div>;
    return (
      <div>
        status: {reward.meta?.status}
        Date paid out: {reward.meta?.customMeta?.datePaidOut}
        Date last attempted: {reward.meta.customMeta?.dateLastAttempted}
        Date first attempted: {reward.meta.customMeta?.dateFirstAttempted}
      </div>
    );
  }
}
