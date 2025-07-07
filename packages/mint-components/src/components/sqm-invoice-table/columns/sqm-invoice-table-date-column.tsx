import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
import { InvoiceTableColumn } from "./InvoiceTableColumn";

/**
 * @uiName Invoice Table Date Column
 * @validParents ["sqm-invoice-table"]
 * @exampleGroup Invoices
 * @example Date Column - <sqm-invoice-table-date-column column-title="Date converted" date-shown="dateConverted"></sqm-invoice-table-date-column>
 */
@Component({
  tag: "sqm-invoice-table-date-column",
  shadow: true,
})
export class InvoiceTableDateColumn implements InvoiceTableColumn {
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Invoice, options?: { locale: string }) {
    return (
      <sqm-invoice-table-date-cell
        date={data.dateCreated}
        locale={options?.locale}
      ></sqm-invoice-table-date-cell>
    );
  }

  @Method()
  async renderLabel() {
    return this.columnTitle;
  }

  render() {
    useRequestRerender([this.columnTitle]);
    return (
      <Host style={{ display: "none" }}>
        <slot />
      </Host>
    );
  }
}
