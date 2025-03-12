import { h } from "@stencil/core";
import {
  BaseRegistrationFormView,
  BaseRegistrationFormViewProps,
} from "./sqm-base-registration-form-view";

export default {
  title: "Components/Microsite Base Registration",
};

const defaultProps: BaseRegistrationFormViewProps = {
  states: {
    error: "",
  },
  callbacks: {
    handleEmailSubmit: () => console.log("Submit!"),
  },
  content: {
    pageLabel: "Register",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
    googleButton: <sl-button>Register with Google</sl-button>,
    secondaryButton: (
      <span>
        Already have an account?{" "}
        <sl-button
          padding="0"
          style={{ width: "60px" }}
          size="large"
          type="text"
        >
          Sign in
        </sl-button>{" "}
      </span>
    ),
  },
};

const errorProps: BaseRegistrationFormViewProps = {
  ...defaultProps,
  states: {
    error: "Something went wrong. Please try again.",
  },
};

export const Default = () => {
  return <BaseRegistrationFormView {...defaultProps} />;
};

export const EmailError = () => {
  return <BaseRegistrationFormView {...errorProps} />;
};
