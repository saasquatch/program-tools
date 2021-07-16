import { Component, h, Method, Host, State, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-rewards-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableRewardsColumn {
  @State()
  ignored = true;

  @Prop() columnTitle: string = "Rewards";

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
    return this.columnTitle;
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
