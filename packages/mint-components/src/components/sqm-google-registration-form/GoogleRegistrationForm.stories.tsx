import { h } from "@stencil/core";
import {
  PortalGoogleRegistrationFormView,
  PortalGoogleRegistrationFormViewProps,
} from "./sqm-google-registration-form-view";

export default {
  title: "Components/Microsite Google Register",
};

const defaultProps: PortalGoogleRegistrationFormViewProps = {
  states: {
    registrationFormState: {},
    error: "",
    loading: false,
    hideInputs: false,
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

export const Default = () => {
  return <PortalGoogleRegistrationFormView {...defaultProps} />;
};
