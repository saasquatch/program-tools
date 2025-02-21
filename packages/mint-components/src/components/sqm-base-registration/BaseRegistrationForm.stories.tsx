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
  return <BaseRegistrationFormView {...defaultProps} />;
};
