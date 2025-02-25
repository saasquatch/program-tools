import { h } from "@stencil/core";
import {
  PortalRegistrationFormView,
  PortalRegistrationFormViewProps,
} from "./sqm-portal-registration-form-view";

export default {
  title: "Components/Microsite Portal Registration Form",
};

const defaultProps: PortalRegistrationFormViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
    isGoogle: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
    setShowRegistrationForm: () => console.log("type form"),
    handleGoogleInit: () => console.log("type form"),
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};

const errorProps: PortalRegistrationFormViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
    isGoogle: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
    setShowRegistrationForm: () => console.log("type form"),
    handleGoogleInit: () => console.log("type form"),
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Register",
    confirmPasswordLabel: "Confirm Password",
  },
};

const loadingProps: PortalRegistrationFormViewProps = {
  states: {
    error: "",
    loading: true,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
    isGoogle: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
    setShowRegistrationForm: () => console.log("type form"),
    handleGoogleInit: () => console.log("type form"),
  },
  refs: {
    formRef: {},
  },
  content: { pageLabel: "Register", confirmPasswordLabel: "Confirm Password" },
};

const slottedProps: PortalRegistrationFormViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: true,
    hideInputs: false,
    loginPath: "/login",
    isGoogle: false,
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
    setShowRegistrationForm: () => console.log("type form"),
    handleGoogleInit: () => console.log("type form"),
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Register",
    confirmPasswordLabel: "Confirm Password",
    formData: (
      <div>
        <sl-input
          style={{ marginBottom: "var(--sl-spacing-x-large)" }}
          exportparts="label: input-label, base: input-base"
          label="Slotted Input"
          required
        ></sl-input>
        <sl-input
          exportparts="label: input-label, base: input-base"
          label="Slotted Input 2"
          required
        ></sl-input>
      </div>
    ),
  },
};

export const Default = () => (
  <PortalRegistrationFormView {...defaultProps}></PortalRegistrationFormView>
);

export const IsGoogle = () => {
  return (
    <PortalRegistrationFormView
      {...defaultProps}
      states={{ ...defaultProps.states, isGoogle: true }}
    ></PortalRegistrationFormView>
  );
};

export const RegisterWithError = () => (
  <PortalRegistrationFormView {...errorProps} />
);

export const RegisterLoading = () => (
  <PortalRegistrationFormView {...loadingProps} />
);

export const FieldsHidden = () => {
  return (
    <sqm-portal-register
      demoData={{
        states: {
          error: "",
          loading: true,
          registrationFormState: {},
          confirmPassword: true,
          hideInputs: true,
          loginPath: "/login",
          isGoogle: false,
        },
      }}
    ></sqm-portal-register>
  );
};

export const SlottedInputs = () => (
  <PortalRegistrationFormView {...slottedProps} />
);

export const SlottedInputsIsGoogle = () => (
  <PortalRegistrationFormView
    {...slottedProps}
    states={{ ...slottedProps.states, isGoogle: true }}
  ></PortalRegistrationFormView>
);

export const TermsAndConditions = () => (
  <PortalRegistrationFormView
    {...defaultProps}
    content={{
      ...defaultProps.content,
      terms: (
        <p>
          By signing up you agree to the{" "}
          <a href="https://example.com" target="_blank">
            Terms and Conditions
          </a>
        </p>
      ),
    }}
  />
);
