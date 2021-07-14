import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-user-cell",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @Prop() name: string;

  render() {
    return <div class="MyStyle">{this.name}</div>;
  }
}
