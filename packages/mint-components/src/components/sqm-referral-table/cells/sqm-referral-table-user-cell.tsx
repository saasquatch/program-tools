import { Component, h, Prop } from "@stencil/core";
import { PresetText } from "../../../functional-components/PresetText";

@Component({
  tag: "sqm-referral-table-user-cell",
  shadow: true,
})
export class ReferralTableUserCell {
  @Prop() name: string;

  render() {
    return <PresetText type="p">{this.name}</PresetText>;
  }
}
