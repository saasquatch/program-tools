import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Host, Method } from "@stencil/core";
import { InvoiceTableColumn } from "./InvoiceTableColumn";

/**
 * @uiName Invoice Table Download Column
 * @validParents ["sqm-invoice-table"]
 */
@Component({
  tag: "sqm-invoice-table-download-column",
  shadow: true,
})
export class InvoiceTableGenericColumn implements InvoiceTableColumn {
  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(data: Invoice) {
    return (
      <sqm-invoice-table-download-cell
        downloadUrl={data.downloadUrl}
      ></sqm-invoice-table-download-cell>
    );
  }

  @Method()
  async renderLabel() {
    return <span></span>;
  }

  render() {
    return (
      <Host style={{ display: "none" }}>
        <slot />
      </Host>
    );
  }
}
