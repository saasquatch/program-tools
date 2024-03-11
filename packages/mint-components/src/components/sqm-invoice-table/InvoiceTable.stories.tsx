import { h } from "@stencil/core";
import { GenericTableView } from "../../tables/GenericTableView";
import scenario from "./invoice-table.feature";

export default {
  title: "Components/Invoice Table",
  parameters: {
    scenario,
  },
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
    empty-state-image="https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_invoice2.png"
    empty-state-header="View your invoice details"
    empty-state-text="Track the status of your invoices and rewards earned by referring friends"
  ></sqm-empty>
);

// Reward Status Cases

const simpleUserTableProps = {
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
      "",
      "Date created",
      "Invoice",
      "Earnings",
      "Taxed Amount",
      "Earnings after tax",
    ],
    rows: [[]],
  },
};

export const SimpleUserTable = () => {
  return <GenericTableView {...simpleUserTableProps}></GenericTableView>;
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
          columns: ["Name", "Email", "DOB"],
          rows: [],
        },
      }}
    ></sqm-invoice-table>
  );
};
