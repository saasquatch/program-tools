import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import scenario from "./sqm-input-field.feature";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

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

  useCannedEnvironment({ programId, user: { id, accountId } });

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
        field-optional="true"
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

export const MissingName = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <sqm-name-fields slot="formData"></sqm-name-fields>
      <sqm-input-field
        slot="formData"
        field-label="Phone Number"
        field-type="tel"
      />
    </sqm-portal-register>
  );
});
