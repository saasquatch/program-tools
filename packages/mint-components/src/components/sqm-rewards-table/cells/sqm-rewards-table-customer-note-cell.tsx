import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { TextSpanView } from "../../sqm-text-span/sqm-text-span-view";

@Component({
  tag: "sqm-rewards-table-customer-note-cell",
  shadow: true,
})
export class RewardTableCustomerNoteCell {
  @State()
  ignored = true;

  @Prop() note: string;
  @Prop() locale: string = "en";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    const note = this.note;
    return <TextSpanView type="p">{note}</TextSpanView>;
  }
}
