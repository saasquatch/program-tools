import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-status-cell",
  shadow: true,
})
export class ReferralTableStatusCell {
  @Prop() statusText: string;
  @Prop() converted: boolean;
  render() {
    return (
      <sl-badge type={this.converted ? "success" : "warning"} pill>
        {this.statusText}
      </sl-badge>
    );
  }
}
