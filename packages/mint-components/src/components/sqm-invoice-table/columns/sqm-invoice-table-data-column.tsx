import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { Invoice } from "../../../saasquatch";
import { useRequestRerender } from "../../../tables/re-render";
import { InvoiceTableColumn } from "./InvoiceTableColumn";

/**
 * @uiName Invoice Table Data Column
 * @validParents ["sqm-invoice-table"]
 */
@Component({
  tag: "sqm-invoice-table-data-column",
  shadow: true,
})
export class InvoiceTableDataColumn implements InvoiceTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string;

  /**
   * @uiName Property name
   */
  @Prop() property: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Invoice) {
    return (
      <sqm-invoice-table-data-cell
        data={data[this.property]}
      ></sqm-invoice-table-data-cell>
    );
  }

  @Method()
  async renderLabel() {
    return Promise.resolve(this.columnTitle);
  }

  render() {
    useRequestRerender([this.columnTitle, this.property]);
    return (
      <Host style={{ display: "none" }}>
        <slot />
      </Host>
    );
  }
}
