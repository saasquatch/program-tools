import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-rewards-cell",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return <div class="MyStyle">content</div>;
  }
}
