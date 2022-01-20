import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { DateTime } from "luxon";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-referral-table-date-cell",
  shadow: true,
})
export class ReferralTableDateCell {
  @State()
  ignored = true;

  @Prop() date: number;
  @Prop() locale: string = "en";
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    // needs hook to use locale
    const date = !this.date
      ? "-"
      : DateTime.fromMillis(this.date)
          ?.setLocale(this.locale)
          .toLocaleString(DateTime.DATE_MED);

    return date;
  }
}
