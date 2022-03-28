import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import scenario from "./sqm-checkbox-field.feature";

export default {
  title: "Hooks / useCheckboxField",
  parameters: {
    scenario,
  },
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  //@ts-ignore
  window.widgetIdent = {
    tenantAlias: "test_a8b41jotf8a1v",
    appDomain: "https://staging.referralsaasquatch.com",
    programId,
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

export const TermsAndConditions = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="terms">
        <sqm-checkbox-field checkbox-name="terms"></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});

export const TermsAndConditionsWithLabel = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="terms">
        <sqm-checkbox-field
          checkbox-label="I agree"
          checkbox-name="terms"
        ></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});

export const MultipleCheckboxes = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-checkbox-field
        slot="formData"
        checkbox-label="I am not a robot"
        error-message="Cannot be a robot"
        checkbox-name="isHuman"
      ></sqm-checkbox-field>
      <div slot="terms">
        <sqm-checkbox-field></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});

export const OptionalCheckboxes = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-checkbox-field
        slot="formData"
        checkbox-label="I am not a robot"
        checkbox-required="false"
        checkbox-name="isHuman"
      />
      <div slot="terms">
        <sqm-checkbox-field></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});
