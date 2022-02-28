import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { useEffect } from "@saasquatch/universal-hooks";
import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
export default {
  title: "Hooks / useDropdownField",
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

export const SelectOptions = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-dropdown-field
        slot="formData"
        dropdown-label="Select an option"
        dropdown-name="options"
      >
        <sl-menu-item value="option-1">Option 1</sl-menu-item>
        <sl-menu-item value="option-2">Option 2</sl-menu-item>
        <sl-menu-item value="option-3">Option 3</sl-menu-item>
      </sqm-dropdown-field>
    </sqm-portal-register>
  );
});

export const Country = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-dropdown-field
        slot="formData"
        dropdown-label="Country"
        dropdown-name="countryCode"
      >
        <sl-menu-item value="CA">Canada</sl-menu-item>
        <sl-menu-item value="US">United States</sl-menu-item>
        <sl-menu-item value="GB">United Kingdom</sl-menu-item>
      </sqm-dropdown-field>
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
