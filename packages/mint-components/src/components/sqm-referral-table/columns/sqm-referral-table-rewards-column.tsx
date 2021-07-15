import { Component, h, Method, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-rewards-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableRewardsColumn {
  @State()
  ignored = true;

  @Method()
  async renderCell(data) {
    return (
      <sqm-referral-table-rewards-cell
        reward={data.prettyValue}
      ></sqm-referral-table-rewards-cell>
    );
  }

  @Method()
  async renderLabel() {
    return "Rewards";
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
