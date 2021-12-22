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
  title: "Hooks / useReferralTable",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
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

export const ReferralTable = createHookStory(() => {
  setupGraphQL();
  setProgramId("sam-partner-test-2");
  const props = {
    listType: "",
    render: () => {},
    disconnectedCallback: () => {},
    ignored: true,
  };
  return (
    <sqm-referral-table>
      <sqm-referral-table-user-column></sqm-referral-table-user-column>
      <sqm-referral-table-status-column></sqm-referral-table-status-column>
      <sqm-referral-table-date-column></sqm-referral-table-date-column>
      <sqm-referral-table-rewards-column></sqm-referral-table-rewards-column>
    </sqm-referral-table>
  );
});
