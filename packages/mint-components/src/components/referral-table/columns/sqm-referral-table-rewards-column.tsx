import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-rewards-column",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableRewardsColumn {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  @Method()
  async renderCell(data) {
    return <span>{data.prettyValue}</span>;
  }

  @Method()
  async renderLabel() {
    return "Rewards";
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
