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
  title: "Components/Checkbox Field",
};

const defaultProps: CheckboxFieldViewProps = {
  states: {
    validationErrors: {},
    checked: false,
  },
  content: {
    checkboxName: "agree",
    checkboxLabel: "By signing up you agree to the {labelLink}",
    checkboxLabelLink: "https://example.com",
    checkboxLabelLinkText: "Terms and Conditions",
    errorMessage: "Must be checked",
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
  <CheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      checked: true,
    }}
  />
));

export const CustomLabel = createHookStory(() => (
  <CheckboxFieldView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      checkboxLabel: "I Agree",
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

export const CustomError = createHookStory(() => (
  <CheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      validationErrors: {
        agree: "This checkbox must be checked to continue",
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
          <sqm-checkbox-field checkbox-label="I agree"></sqm-checkbox-field>
        </p>
      ),
    }}
  />
));

export const TermsAndConditionsLongCustomLabel = createHookStory(() => (
  <PortalRegisterView
    {...defaultRegisterProps}
    //@ts-ignore
    content={{
      ...defaultRegisterProps.content,
      terms: (
        <sqm-checkbox-field
          checkbox-label="Participants must be at least 18 years of age and a legal resident of the U.S. or Canada. By signing up to participate in the rewards program, you agree to the terms {labelLink}."
          checkbox-label-link="https://www.example.com"
          checkbox-label-link-text="terms"
          checkbox-name="termsAndConditions"
        />
      ),
    }}
  />
));
