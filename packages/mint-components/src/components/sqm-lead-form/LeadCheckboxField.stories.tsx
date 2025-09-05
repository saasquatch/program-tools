import { h } from "@stencil/core";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import {
  LeadCheckboxFieldView,
  LeadCheckboxFieldViewProps,
} from "./sqm-lead-checkbox-field-view";

export default {
  title: "Components/Lead Checkbox Field",
};

const defaultProps: LeadCheckboxFieldViewProps = {
  states: {
    leadFormState: {
      validationErrors: {},
    },
  },
  content: {
    checkboxName: "terms",
    checkboxLabel: "By signing up you agree to the {labelLink}",
    checkboxLabelLink: "https://example.com",
    checkboxLabelLinkText: "Terms and Conditions",
    errorMessage: "{checkboxLabel} Must be checked",
  },
};

export const Default = createHookStory(() => (
  <LeadCheckboxFieldView {...defaultProps} />
));

export const CustomLabel = createHookStory(() => (
  <LeadCheckboxFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      checkboxLabel: "I Agree",
    }}
  />
));

export const Error = createHookStory(() => (
  <LeadCheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        validationErrors: {
          terms: "{checkboxLabel} Must be checked",
        },
      },
    }}
  />
));

export const CustomError = createHookStory(() => (
  <LeadCheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        validationErrors: {
          terms: "{checkboxLabel} Must be checked",
        },
      },
    }}
    content={{
      ...defaultProps.content,
      errorMessage: "This checkbox must be checked to continue",
    }}
  />
));
