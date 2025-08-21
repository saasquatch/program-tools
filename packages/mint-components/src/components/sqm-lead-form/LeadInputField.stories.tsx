import { h } from "@stencil/core";
import {
  LeadInputFieldView,
  LeadInputFieldViewProps,
} from "./sqm-lead-input-field-view";

export default {
  title: "Components/Lead Form Input Field",
};

const defaultProps: LeadInputFieldViewProps = {
  states: {
    leadFormState: {
      validationErrors: {},
      loading: false,
      disabled: false,
      initialData: {},
    },
  },
  content: {
    required: false,
    fieldName: "firstName",
    fieldLabel: "First Name",
    fieldType: "text",
    requiredFieldErrorMessage: "Please {fieldAction} a {fieldLabel}",
    fieldOptional: false,
  },
};

export const Default = () => <LeadInputFieldView {...defaultProps} />;

export const WithError = () => (
  <LeadInputFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,

        validationErrors: {
          firstName: "Please enter a first name",
        },
      },
    }}
  />
);

export const Disabled = () => (
  <LeadInputFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,
        disabled: true,
      },
    }}
  />
);

export const WithInitialValue = () => (
  <LeadInputFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,
        initialData: {
          firstName: "Jane",
        },
      },
    }}
  />
);
