import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import { InputFieldView, InputFieldViewProps } from "./sqm-input-field-view";
export default {
  title: "Components/Input Field",
};

const defaultProps: InputFieldViewProps = {
  states: {
    validationErrors: {},
  },
  content: {
    fieldName: "field",
    fieldLabel: "My Custom Input",
    fieldRequired: true,
    errorMessage: "Cannot be empty",
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
  <InputFieldView {...defaultProps} />
));

export const CustomLabel = createHookStory(() => (
  <InputFieldView
    {...defaultProps}
    content={{ ...defaultProps.content, fieldLabel: "My Label" }}
  />
));

export const Error = createHookStory(() => (
  <InputFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        field: "Cannot be empty",
      },
    }}
  />
));

export const CustomError = createHookStory(() => (
  <InputFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      errorMessage: "A value must be entered to continue",
    }}
    states={{
      ...defaultProps.states,
      validationErrors: {
        field: "Cannot be empty",
      },
    }}
  />
));

export const RegistrationField = createHookStory(() => (
  <PortalRegisterView
    {...defaultRegisterProps}
    content={{
      ...defaultRegisterProps.content,
      formData: <sqm-input-field></sqm-input-field>,
    }}
  />
));

export const RegistrationFieldCustomLabel = createHookStory(() => (
  <PortalRegisterView
    {...defaultRegisterProps}
    content={{
      ...defaultRegisterProps.content,
      formData: <sqm-input-field field-label="Data"></sqm-input-field>,
    }}
  />
));
