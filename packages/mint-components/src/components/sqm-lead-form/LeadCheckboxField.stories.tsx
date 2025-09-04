import { h } from "@stencil/core";
import {
  PortalRegisterView,
  PortalRegisterViewProps,
} from "../sqm-portal-register/sqm-portal-register-view";
import { createHookStory } from "../sqm-stencilbook/HookStoryAddon";
import {
  LeadCheckboxFieldView,
  LeadCheckboxFieldViewProps,
} from "./sqm-lead-checkbox-field-view";
import scenario from "./sqm-checkbox-field.feature";

export default {
  title: "Components/Checkbox Field",
  parameters: {
    scenario,
  },
};

const defaultProps: LeadCheckboxFieldViewProps = {
  states: {
    leadFormState: {
      validationErrors: {},
    },
    checked: false,
  },
  content: {
    checkboxName: "terms",
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
    registrationFormState: {},
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
  content: {
    pageLabel: "Register",
    confirmPasswordLabel: "Confirm Password",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
  },
};

export const Default = createHookStory(() => (
  <LeadCheckboxFieldView {...defaultProps} />
));

export const DefaultChecked = createHookStory(() => (
  <LeadCheckboxFieldView
    {...defaultProps}
    states={{
      ...defaultProps.states,
      checked: true,
    }}
  />
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
          agree: "Must be checked",
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
          agree: "Must be checked",
        },
      },
    }}
    content={{
      ...defaultProps.content,
      errorMessage: "This checkbox must be checked to continue",
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
          checkbox-label="Participants must be at least 18 years of age and a legal resident of the U.S. or Canada. By signing up to participate in the rewards program, you agree to the {labelLink}."
          checkbox-label-link="https://www.example.com"
          checkbox-label-link-text="terms"
          checkbox-name="termsAndConditions"
        />
      ),
    }}
  />
));
