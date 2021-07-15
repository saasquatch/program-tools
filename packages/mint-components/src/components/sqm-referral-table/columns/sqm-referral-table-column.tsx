import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Host, State } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-column",
  styleUrl: "../sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @State()
  ignored = true;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  @Method()
  async renderCell(data: Referral) {
    return <span>{data.dateConverted}</span>;
  }

  @Method()
  async renderLabel() {
    return "Date Converted";
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
