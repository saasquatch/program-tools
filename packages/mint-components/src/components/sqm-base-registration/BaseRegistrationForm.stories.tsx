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
    // AL: TODO
    // registrationFormState: {},
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
  },
};

export const Default = () => {
  return <BaseRegistrationFormView {...defaultProps} />;
};
