import { VNode } from "@stencil/core";

export interface InvoiceTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(
    data: Invoice,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
}
