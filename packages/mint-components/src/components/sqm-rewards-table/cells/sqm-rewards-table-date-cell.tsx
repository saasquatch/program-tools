import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { DateTime } from "luxon";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-rewards-table-date-cell",
  shadow: true,
})
export class RewardTableDateCell {
  @State()
  ignored = true;

  @Prop() date: number;
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const date = !this.date
      ? "-"
      : DateTime.fromMillis(this.date)?.toLocaleString(DateTime.DATE_MED);

    return <TextSpanView type="p">{date}</TextSpanView>;
  }
}
