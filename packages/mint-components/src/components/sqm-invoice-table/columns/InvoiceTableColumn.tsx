import { VNode } from "@stencil/core";
import { ImpactConnection, Invoice } from "../../../saasquatch";

export interface InvoiceTableColumn {
  renderLabel(idx?: number): Promise<string>;
  renderCell(
    data: Invoice,
    options: { locale: string; taxConnection?: ImpactConnection }
  ): Promise<VNode>;
}
