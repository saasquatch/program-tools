import { Component, h, Prop } from "@stencil/core";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-referral-table-user-cell",
  shadow: true,
})
export class ReferralTableUserCell {
  @Prop() name: string;

  render() {
    return <TextSpanView type="p">{this.name}</TextSpanView>;
  }
}
