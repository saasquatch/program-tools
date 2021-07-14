import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Method, Host, State, Prop } from "@stencil/core";

@Component({
  tag: "sqm-referral-table-referral-date-column",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableDateColumn {
  @State()
  ignored = true;

  @Prop() dateLabel: string = "Date Converted";
  @Prop() dateShown: string = "dateConverted";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}
  @Method()
  async renderCell(data) {
    return (
      <sqm-referral-table-referral-date-cell
        date={data[this.dateShown]}
      ></sqm-referral-table-referral-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.dateLabel;
  }

  render() {
    return <Host style={{ display: "none" }} />;
  }
}
