import {
  setProgramId,
} from "@saasquatch/component-boilerplate";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export default {
  title: "Hooks / useInvoiceTable",
};

function setupGraphQL() {
  const id = "07bc01a0f123d20342b89ed8296946a747f770cc8bbd239d7f142fe629f826ac";
  const accountId =
    "07bc01a0f123d20342b89ed8296946a747f770cc8bbd239d7f142fe629f826ac";

  const programId = "22999";

  useCannedEnvironment({ programId, user: { id, accountId } });

  return { id, accountId };
}

export const InvoiceTable = createHookStory(() => {
  setupGraphQL();
  setProgramId("22999");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-invoice-table>
      <sqm-invoice-table-download-column></sqm-invoice-table-download-column>
      <sqm-invoice-table-date-column column-title="Date"></sqm-invoice-table-date-column>
      <sqm-invoice-table-data-column
        column-title="Invoice"
        property="invoiceId"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Earnings"
        property="earnings"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Indirect tax"
        property="indirectTax"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Earnings after tax"
        property="netEarnings"
      ></sqm-invoice-table-data-column>
    </sqm-invoice-table>
  );
});

export const InvoiceTableDemoHook = createHookStory(() => {
  return (
    <sqm-invoice-table>
      <sqm-invoice-table-download-column></sqm-invoice-table-download-column>
      <sqm-invoice-table-date-column column-title="Date"></sqm-invoice-table-date-column>
      <sqm-invoice-table-data-column
        column-title="Invoice"
        property="invoiceId"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Earnings"
        property="earnings"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Indirect tax"
        property="indirectTax"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Earnings after tax"
        property="netEarnings"
      ></sqm-invoice-table-data-column>
    </sqm-invoice-table>
  );
});
