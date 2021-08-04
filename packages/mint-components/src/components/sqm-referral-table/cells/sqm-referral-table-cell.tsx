import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-cell",
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
    return <div innerHTML={this.innerTemplate}></div>;
  }
}
