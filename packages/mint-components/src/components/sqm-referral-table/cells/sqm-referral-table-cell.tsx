import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-cell",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableCell {
  @State()
  ignored = true;

  @Prop() innerTemplate: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <div class="MyStyle" innerHTML={this.innerTemplate}></div>;
  }
}
