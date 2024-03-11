import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";

@Component({
  tag: "sqm-invoice-table-cell",
  shadow: true,
})
export class InvoiceTableCell {
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
