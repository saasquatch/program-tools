import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import {
  DropdownFieldView,
  DropdownFieldViewProps,
} from "./sqm-dropdown-field-view";
export default {
  title: "Components/Dropdown Field",
};

const defaultProps: DropdownFieldViewProps = {
  states: {
    validationErrors: {},
    checked: false,
  },
  content: {
    dropdownName: "agree",
    dropdownLabel: "By signing up you agree to the {labelLink}",
    errorMessage: "Must be checked",
    selectOptions: [
      <sl-menu-item value="option-1" slot="option">
        Option 1
      </sl-menu-item>,
      <sl-menu-item value="option-2" slot="option">
        Option 2
      </sl-menu-item>,
      <sl-menu-item value="option-3" slot="option">
        Option 3
      </sl-menu-item>,
    ],
  },
  callbacks: {
    setChecked: () => {},
  },
};

const defaultRegisterProps: PortalRegisterViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};

export const Default = createHookStory(() => (
  <DropdownFieldView {...defaultProps} />
));

export const DefaultSelect = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      checked: true,
    }}
  />
));

export const CustomLabel = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      dropdownLabel: "I Agree",
    }}
  />
));

export const Error = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        agree: "Must be checked",
      },
    }}
  />
));

export const CustomError = createHookStory(() => (
  <DropdownFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        agree: "This checkbox must be checked to continue",
      },
    }}
  />
));

export const CountrySelect = createHookStory(() => (
  <PortalRegisterView
    {...defaultRegisterProps}
    //@ts-ignore
    content={{
      ...defaultRegisterProps.content,
      terms: (
        <p>
          <sqm-checkbox-field></sqm-checkbox-field>
        </p>
      ),
    }}
  />
));
