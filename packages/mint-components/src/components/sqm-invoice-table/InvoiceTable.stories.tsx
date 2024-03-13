import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import {
  DateCell,
  DownloadCell,
  EarningsAfterTaxCell,
  EarningsCell,
  InvoiceNumberCell,
  TaxedAmountCell,
} from "./InvoiceTableCell.stories";
import { InvoiceTableView } from "./sqm-invoice-table-view";

export default {
  title: "Components/Invoice Table",
};

const loadingElement = (
  <div slot="loading" style={{ display: "contents" }}>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
    <sqm-table-row>
      <sqm-table-cell colspan={5}>
        <sl-skeleton></sl-skeleton>
      </sqm-table-cell>
    </sqm-table-row>
  </div>
);

const emptyElement = (
  <sqm-empty
    empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_referral2.png"
    empty-state-header="View your invoice details"
    empty-state-text="Track the status of your invoices and rewards earned by referring friends"
  ></sqm-empty>
);

// Reward Status Cases

const simpleInvoiceTableProps = {
  states: {
    hasPrev: false,
    hasNext: true,
    show: "rows" as const,
    namespace: "sqm-invoice-table",
  },
  data: {
    textOverrides: {
      showLabels: true,
      prevLabel: "Prev",
      moreLabel: "Next",
    },
    hiddenColumns: "",
    mdBreakpoint: 799,
    smBreakpoint: 599,
  },
  callbacks: {
    prevPage: () => console.log("Prev"),
    nextPage: () => console.log("Next"),
  },

  elements: {
    columns: [
      <span></span>,
      "Date created",
      "Invoice",
      "Earnings",
      "Taxed Amount",
      "Earnings after tax",
    ],
    rows: [
      [
        <DownloadCell />,
        <DateCell />,
        <InvoiceNumberCell />,
        <EarningsCell />,
        <TaxedAmountCell />,
        <EarningsAfterTaxCell />,
      ],
      [
        <DownloadCell />,
        <DateCell />,
        <InvoiceNumberCell />,
        <EarningsCell />,
        <TaxedAmountCell />,
        <EarningsAfterTaxCell />,
      ],
      [
        <DownloadCell />,
        <DateCell />,
        <InvoiceNumberCell />,
        <EarningsCell />,
        <TaxedAmountCell />,
        <EarningsAfterTaxCell />,
      ],
    ],
  },
};

export const SimpleInvoiceTable = () => {
  return (
    <InvoiceTableView
      header={"Invoices"}
      description={"Invoice table description"}
    >
      <GenericTableView {...simpleInvoiceTableProps}></GenericTableView>
    </InvoiceTableView>
  );
};

export const EmptyTable = () => {
  return (
    <sqm-invoice-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          show: "empty" as const,
          namespace: "sqm-invoice-table",
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          hiddenColumns: "",
          mdBreakpoint: 799,
          smBreakpoint: 599,
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: ["Name", "Email", "DOB"],
          rows: [],
        },
      }}
    ></sqm-invoice-table>
  );
};

export const LoadingTable = () => {
  return (
    <sqm-invoice-table
      demoData={{
        states: {
          hasPrev: false,
          hasNext: false,
          show: "loading",
          namespace: "sqm-invoice-table",
        },
        data: {
          textOverrides: {
            showLabels: true,
            prevLabel: "Prev",
            moreLabel: "View More",
          },
          hiddenColumns: "",
          mdBreakpoint: 799,
          smBreakpoint: 599,
        },
        elements: {
          emptyElement: emptyElement,
          loadingElement: loadingElement,
          columns: [
            "",
            "Date created",
            "Invoice",
            "Earnings",
            "Taxed Amount",
            "Earnings after tax",
          ],
          rows: [],
        },
      }}
    ></sqm-invoice-table>
  );
};