import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, getElement, h, Host, Method, Prop } from "@stencil/core";
import { useRequestRerender } from "../../../tables/re-render";
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
  /**
   * @uiName Column title
   */
  @Prop() columnTitle: string;

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  @Method()
  async renderCell(_: Invoice) {
    // this is insecure, <script> tags can be added
    return (
      <sqm-invoice-table-cell
        inner-template={getElement(this).innerHTML}
      ></sqm-invoice-table-cell>
    );
  }

  @Method()
  async renderLabel() {
    return <span>{Promise.resolve(this.columnTitle)}</span>;
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
