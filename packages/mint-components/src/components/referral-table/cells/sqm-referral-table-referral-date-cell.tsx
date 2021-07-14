import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { DateTime } from "luxon";

@Component({
  tag: "sqm-referral-table-referral-date-cell",
  styleUrl: "../sqm-referral-table/sqm-referral-table.scss",
  shadow: true,
})
export class ReferralTableColumn {
  @State()
  ignored = true;

  @Prop() date: number;
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const date = this.date
      ? DateTime.fromMillis(this.date)?.toLocaleString(DateTime.DATE_MED)
      : "";
    return <div class="MyStyle">{date}</div>;
  }
}
