import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @Prop() reward: string;

  render() {
    return <div class="MyStyle">{this.reward}</div>;
  }
}
