import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";
export default {
  title: "Hooks / useDropdownField",
};

function setupGraphQL() {
  const id = "testestest";
  const accountId = id;
  const programId = "sam-partner-test-2";

  useCannedEnvironment({ programId, user: { id, accountId } });

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

export const Countries = createHookStory(() => {
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

export const MissingName = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-dropdown-field slot="formData" dropdown-label="Country">
        <sl-menu-item value="CA">Canada</sl-menu-item>
        <sl-menu-item value="US">United States</sl-menu-item>
        <sl-menu-item value="GB">United Kingdom</sl-menu-item>
      </sqm-dropdown-field>
    </sqm-portal-register>
  );
});
