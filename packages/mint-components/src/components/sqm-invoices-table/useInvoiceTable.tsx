import { VNode } from "@stencil/core";
import { InvoiceTable } from "./sqm-invoice-table";
import { GenericTableViewProps } from "../../tables/GenericTableView";
import debugFn from "debug";
const debug = debugFn("sq:useInvoiceTable");

export const CSS_NAMESPACE = "sqm-invoice-table";

export function useInvoiceTable(
  props: InvoiceTable,
  emptyElement: VNode,
  loadingElement: VNode
): GenericTableViewProps {
  return {
    ...props,
    states: {
      namespace: CSS_NAMESPACE,
      hasPrev: false,
      hasNext: false,
      show: "loading",
    },
    data: {
      textOverrides: {
        showLabels: false,
        prevLabel: "",
        moreLabel: "",
      },
      hiddenColumns: "",
      mdBreakpoint: 0,
      smBreakpoint: 0,
    },
    elements: {
      emptyElement,
      loadingElement,
      columns: [],
      rows: [],
    },
    callbacks: {
      prevPage: function (): void {
        throw new Error("Function not implemented.");
      },
      nextPage: function (): void {
        throw new Error("Function not implemented.");
      },
    },
  };
}
