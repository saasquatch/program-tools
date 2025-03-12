import { h } from "@stencil/core";
import {
  PortalRegistrationFormView,
  PortalRegistrationFormViewProps,
} from "../sqm-portal-registration-form/sqm-portal-registration-form-view";
import { NameFieldsView } from "../sqm-name-fields/sqm-name-fields-view";

export default {
  title: "Components/Microsite Google Register",
};

const defaultProps: PortalRegistrationFormViewProps = {
  states: {
    error: "",
    loading: false,
    confirmPassword: false,
    hideInputs: false,
    loginPath: "/login",
    hidePasswords: true,
    registrationFormState: {
      initialData: {
        email: "testuser@example.com",
      },
    },
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
    passwordField: null,
    formData: (
      <div>
        {" "}
        <NameFieldsView
          states={{
            registrationFormState: {
              validationErrors: undefined,
              disabled: true,
              initialData: {
                firstName: "Test",
                lastName: "User",
              },
            },
            content: {
              firstNameLabel: "First Name",
              lastNameLabel: "Last Name",
            },
          }}
        />
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

const errorProps: PortalRegistrationFormViewProps = {
  ...defaultProps,
  states: {
    error: "Something went wrong. Please try again.",
    loading: false,
    confirmPassword: false,
    hideInputs: false,
    loginPath: "/login",
    hidePasswords: true,
    registrationFormState: {
      initialData: {
        email: "testuser@example.com",
      },
    },
  },
};

const loadingProps: PortalRegistrationFormViewProps = {
  ...defaultProps,
  states: {
    error: "",
    loading: true,
    hideInputs: false,
    loginPath: "/login",
    confirmPassword: false,
    hidePasswords: true,
    registrationFormState: {
      initialData: {
        email: "testuser@example.com",
      },
    },
  },
};

export const Default = () => (
  <PortalRegistrationFormView {...defaultProps}></PortalRegistrationFormView>
);

export const RegisterWithError = () => (
  <PortalRegistrationFormView {...errorProps} />
);

export const RegisterLoading = () => (
  <PortalRegistrationFormView {...loadingProps} />
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
