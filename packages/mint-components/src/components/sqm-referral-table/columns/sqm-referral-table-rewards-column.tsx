import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-rewards-column",
  shadow: true,
})
export class ReferralTableRewardsColumn implements ReferralTableColumn {
  @Prop() columnTitle: string = "Rewards";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Referral) {
    // TODO: Do the right thing with many rewards, pending rewards, canceled rewards
    return (
      <sqm-referral-table-rewards-cell
        rewards={data.rewards}
      ></sqm-referral-table-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
