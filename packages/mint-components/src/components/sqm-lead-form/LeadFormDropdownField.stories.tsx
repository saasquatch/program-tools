import { h } from "@stencil/core";
import {
  LeadDropdownFieldView,
  DropdownFieldViewProps,
} from "./sqm-lead-dropdown-field-view";

export default {
  title: "Components/Lead Form Dropdown Field",
};

const defaultProps: DropdownFieldViewProps = {
  states: {
    leadFormState: {
      validationErrors: {},
      loading: false,
      disabled: false,
      initialData: {},
    },
  },
  content: {
    dropdownName: "country",
    dropdownLabel: "Country",
    requiredFieldErrorMessage: "Please select a country",
    dropdownOptional: false,
    selectOptions: [
      <sl-menu-item value="red">Canada</sl-menu-item>,
      <sl-menu-item value="blue">United States</sl-menu-item>,
      <sl-menu-item value="green">Mexico</sl-menu-item>,
    ],
  },
};

export const Default = () => <LeadDropdownFieldView {...defaultProps} />;

export const WithError = () => (
  <LeadDropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,
        validationErrors: {
          country: "Please select a country",
        },
      },
    }}
  />
);

export const Disabled = () => (
  <LeadDropdownFieldView
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

export const Loading = () => (
  <LeadDropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,
        loading: true,
      },
    }}
  />
);

export const WithInitialValue = () => (
  <LeadDropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      leadFormState: {
        ...defaultProps.states.leadFormState,
        initialData: {
          country: "Canada",
        },
      },
    }}
  />
);
