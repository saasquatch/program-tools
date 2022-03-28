import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import scenario from "./sqm-input-field.feature";

export default {
  title: "Hooks / useInputField",
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

export const FormData = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="formData">
        <sqm-input-field field-name="myData"></sqm-input-field>
      </div>
    </sqm-portal-register>
  );
});

export const FormDataWithLabel = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="formData">
        <sqm-input-field
          field-label="Custom Label"
          field-name="myData"
        ></sqm-input-field>
      </div>
    </sqm-portal-register>
  );
});

export const MultipleInputs = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Field One"
        field-name="fieldOne"
      ></sqm-input-field>
      <sqm-input-field
        slot="formData"
        field-label="Field Two"
        field-name="fieldTwo"
      ></sqm-input-field>
    </sqm-portal-register>
  );
});

export const OptionalInputs = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Optional Field"
        field-required="false"
        field-name="optionalField"
      />
    </sqm-portal-register>
  );
});

export const DateType = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Date"
        field-name="date"
        field-type="date"
      />
    </sqm-portal-register>
  );
});

export const NumberType = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Number"
        field-name="number"
        field-type="number"
      />
    </sqm-portal-register>
  );
});

export const TelType = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Phone Number"
        field-name="tel"
        field-type="tel"
      />
    </sqm-portal-register>
  );
});
