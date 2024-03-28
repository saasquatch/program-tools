import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: "sqm-invoice-table-data-cell",
  shadow: true,
})
export class InvoiceTableDataCell {
  @State()
  ignored = true;

  @Prop() data: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return this.data;
  }
}
