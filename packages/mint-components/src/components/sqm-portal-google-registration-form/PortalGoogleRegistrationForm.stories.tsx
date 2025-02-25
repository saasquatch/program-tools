import { h } from "@stencil/core";
import {
  PortalGoogleRegistrationFormView,
  PortalGoogleRegistrationFormViewProps,
} from "./sqm-portal-google-registration-form-view";

export default {
  title: "Components/Microsite Portal Registration Form",
};

const defaultProps: PortalGoogleRegistrationFormViewProps = {
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

const errorProps: PortalGoogleRegistrationFormViewProps = {
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

const loadingProps: PortalGoogleRegistrationFormViewProps = {
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

const slottedProps: PortalGoogleRegistrationFormViewProps = {
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
  <PortalGoogleRegistrationFormView
    {...defaultProps}
  ></PortalGoogleRegistrationFormView>
);

export const IsGoogle = () => {
  return (
    <PortalGoogleRegistrationFormView
      {...defaultProps}
      states={{ ...defaultProps.states, isGoogle: true }}
    ></PortalGoogleRegistrationFormView>
  );
};

export const RegisterWithError = () => (
  <PortalGoogleRegistrationFormView {...errorProps} />
);

export const RegisterLoading = () => (
  <PortalGoogleRegistrationFormView {...loadingProps} />
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
        },
      }}
    ></sqm-portal-register>
  );
};

export const SlottedInputs = () => (
  <PortalGoogleRegistrationFormView {...slottedProps} />
);

export const SlottedInputsIsGoogle = () => (
  <PortalGoogleRegistrationFormView
    {...slottedProps}
    states={{ ...slottedProps.states, isGoogle: true }}
  ></PortalGoogleRegistrationFormView>
);

export const TermsAndConditions = () => (
  <PortalGoogleRegistrationFormView
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
