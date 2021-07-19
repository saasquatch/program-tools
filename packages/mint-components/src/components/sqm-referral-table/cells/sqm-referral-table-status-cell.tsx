import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-status-cell",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableStatusCell {
  @Prop() statusText: string;
  render() {
    return <sl-badge type="primary">{this.statusText}</sl-badge>;
  }
}
