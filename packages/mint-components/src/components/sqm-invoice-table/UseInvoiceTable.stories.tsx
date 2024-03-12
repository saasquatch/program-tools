import { setProgramId } from "@saasquatch/component-boilerplate";
import {
  setUserIdentity,
  useLazyQuery,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { gql } from "graphql-request";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";

export default {
  title: "Hooks / useInvoiceTable",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.invoicesaasquatch.com",
    // programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs",
    });
    return () => {
      window.widgetIdent = undefined;
      setUserIdentity(undefined);
    };
  }, []);

  return { id, accountId };
}

function setupGraphQLKlip({ token, id }) {
  const accountId = id;
  // const programId = "klip-invoice-program";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a74miwdpofztj",
    appDomain: "https://staging.invoicesaasquatch.com",
    // programId,
  };
  useEffect(() => {
    setUserIdentity({
      accountId,
      id,
      jwt: token,
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
  setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-invoice-table>
      <sqm-invoice-table-user-column></sqm-invoice-table-user-column>
      <sqm-invoice-table-status-column></sqm-invoice-table-status-column>
      <sqm-invoice-table-date-column></sqm-invoice-table-date-column>
      <sqm-invoice-table-rewards-column></sqm-invoice-table-rewards-column>
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
