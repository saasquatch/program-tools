import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import {
  CheckboxFieldView,
  CheckboxFieldViewProps,
} from "./sqm-checkbox-field-view";
export default {
  title: "Checkbox Field",
};

const defaultProps: CheckboxFieldViewProps = {
  states: {
    validationErrors: {},
    checked: false,
  },
  content: {
    checkboxName: "agree",
    errorMessage: "Must be checked",
    labelSlot: (
      <slot>
        <p>
          By signing up you agree to the{" "}
          <a href="https://example.com" target="_blank">
            Terms and Conditions
          </a>
        </p>
      </slot>
    ),
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
  <CheckboxFieldView {...defaultProps} />
));

export const DefaultChecked = createHookStory(() => (
  <CheckboxFieldView {...defaultProps} states={{
    ...defaultProps.states,
    checked:true
  }} />
));

export const CustomLabel = createHookStory(() => (
  <CheckboxFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      labelSlot: <slot>Agree to terms and conditions</slot>,
    }}
  />
));

export const Error = createHookStory(() => (
  <CheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        agree: "Must be checked",
      },
    }}
  />
));

export const TermsAndConditions = createHookStory(() => (
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

export const TermsAndConditionsCustomLabel = createHookStory(() => (
  <PortalRegisterView
    {...defaultRegisterProps}
    //@ts-ignore
    content={{
      ...defaultRegisterProps.content,
      terms: (
        <p>
          By signing up you agree to the{" "}
          <a href="https://example.com" target="_blank">
            Terms and Conditions
          </a>
          <sqm-checkbox-field>
            <p>I Agree</p>
          </sqm-checkbox-field>
        </p>
      ),
    }}
  />
));
