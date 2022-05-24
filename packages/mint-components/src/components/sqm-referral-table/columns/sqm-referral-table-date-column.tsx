import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../re-render";
import { ReferralTableColumn } from "./ReferralTableColumn";

@Component({
  tag: "sqm-referral-table-date-column",
  shadow: true,
})
export class ReferralTableDateColumn implements ReferralTableColumn {
  @Prop() columnTitle: string = "Date Converted";
  @Prop() dateShown: string = "dateConverted";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data:Referral) {
    // TODO - Validate `dateShown` against a set of known values
    return (
      <sqm-referral-table-date-cell
        date={data[this.dateShown]}
      ></sqm-referral-table-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.dateShown, this.columnTitle]);
    return <Host style={{ display: "none" }} />;
  }
}
