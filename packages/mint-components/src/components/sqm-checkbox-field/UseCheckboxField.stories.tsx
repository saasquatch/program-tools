import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import scenario from "./sqm-checkbox-field.feature";
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

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

  useCannedEnvironment({ programId, user: { id, accountId } });

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
        <sqm-checkbox-field checkbox-name="otherCheckbox"></sqm-checkbox-field>
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
        checkbox-optional="true"
        checkbox-name="isHuman"
      />
      <div slot="terms">
        <sqm-checkbox-field checkbox-name="required"></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});

export const MissingName = createHookStory(() => {
  setupGraphQL();
  return (
    <sqm-portal-register>
      <div slot="terms">
        <sqm-checkbox-field></sqm-checkbox-field>
      </div>
    </sqm-portal-register>
  );
});
