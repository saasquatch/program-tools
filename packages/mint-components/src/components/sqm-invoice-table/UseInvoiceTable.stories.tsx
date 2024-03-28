import {
  setProgramId,
  setUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

export default {
  title: "Hooks / useInvoiceTable",
};

function setupGraphQL() {
  const id = "07bc01a0f123d20342b89ed8296946a747f770cc8bbd239d7f142fe629f826ac";
  const accountId =
    "07bc01a0f123d20342b89ed8296946a747f770cc8bbd239d7f142fe629f826ac";

  const programId = "22999";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "aprh0cfq6y8tk",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
  };

  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJraWQiOiJJUk1Yc1l5NllZcXE0Njk0MzdtRzhFUlF0OFFvS0ZCYUcxIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiI2NWVmYTdiMzY0NWJlNjQ2OGVjOGYwMDMiLCJpYXQiOjE3MTAyMDQ4NTEsImV4cCI6MTcxMDI5MTI1MSwic3ViIjoiTURkaVl6QXhZVEJtTVRJelpESXdNelF5WWpnNVpXUTRNamsyT1RRMllUYzBOMlkzTnpCall6aGlZbVF5TXpsa04yWXhOREptWlRZeU9XWTRNalpoWXc9PTpNRGRpWXpBeFlUQm1NVEl6WkRJd016UXlZamc1WldRNE1qazJPVFEyWVRjME4yWTNOekJqWXpoaVltUXlNemxrTjJZeE5ESm1aVFl5T1dZNE1qWmhZdz09QGFwcmgwY2ZxNnk4dGs6dXNlcnMiLCJ1c2VyIjp7ImlkIjoiMDdiYzAxYTBmMTIzZDIwMzQyYjg5ZWQ4Mjk2OTQ2YTc0N2Y3NzBjYzhiYmQyMzlkN2YxNDJmZTYyOWY4MjZhYyIsImFjY291bnRJZCI6IjA3YmMwMWEwZjEyM2QyMDM0MmI4OWVkODI5Njk0NmE3NDdmNzcwY2M4YmJkMjM5ZDdmMTQyZmU2MjlmODI2YWMiLCJkYXRlQmxvY2tlZCI6bnVsbH19.cYhNPaaBwffl3PxUZXuwQKmTd_3OgDGppxrBkMmJxNA",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

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
        column-title="Taxed Amount"
        property="taxedAmount"
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
        column-title="Taxed Amount"
        property="taxedAmount"
      ></sqm-invoice-table-data-column>
      <sqm-invoice-table-data-column
        column-title="Earnings after tax"
        property="netEarnings"
      ></sqm-invoice-table-data-column>
    </sqm-invoice-table>
  );
});
