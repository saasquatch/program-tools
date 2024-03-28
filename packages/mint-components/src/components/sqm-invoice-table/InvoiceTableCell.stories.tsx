import { h } from "@stencil/core";

export default {
  title: "Components/Invoice Table Cell",
  parameters: {},
};

export const TableCell = () => {
  return (
    <sqm-invoice-table-cell innerTemplate="Table Cell Text"></sqm-invoice-table-cell>
  );
};

export const InvoiceNumberCell = () => {
  return (
    <sqm-invoice-table-cell innerTemplate="12345-67"></sqm-invoice-table-cell>
  );
};

export const EarningsCell = () => {
  return (
    <sqm-invoice-table-cell innerTemplate="US$20.00"></sqm-invoice-table-cell>
  );
};

export const EarningsAfterTaxCell = () => {
  return (
    <sqm-invoice-table-cell innerTemplate="US$15.00"></sqm-invoice-table-cell>
  );
};

export const TaxedAmountCell = () => {
  return (
    <sqm-invoice-table-cell innerTemplate="US$5.00"></sqm-invoice-table-cell>
  );
};

export const DownloadCell = () => {
  return (
    <sqm-invoice-table-download-cell downloadUrl="https://www.example.com"></sqm-invoice-table-download-cell>
  );
};

export const EmptyCell = () => (
  <sqm-sqm-invoice-table-cell>-</sqm-sqm-invoice-table-cell>
);

export const DateCell = () => {
  return (
    <sqm-invoice-table-date-cell
      date={1710203213000}
    ></sqm-invoice-table-date-cell>
  );
};
