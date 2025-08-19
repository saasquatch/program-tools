import { h } from "@stencil/core";
import { LeadFormView, LeadFormViewProps } from "./sqm-lead-form-view";

export default {
  title: "Components/Lead Form",
};

const defaultProps: LeadFormViewProps = {
  states: {
    leadFormState: {},
    error: "",
    loading: false,
    referralCode: "ABC123",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Submit your information",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
  },
};

const errorProps: LeadFormViewProps = {
  states: {
    error: "Something went wrong. Please try again.",
    leadFormState: {},
    loading: false,
    referralCode: "ABC123",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Submit your information",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
  },
};

const loadingProps: LeadFormViewProps = {
  states: {
    leadFormState: {},
    error: "",
    loading: true,
    referralCode: "ABC123",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Submit your information",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
  },
};

const slottedProps: LeadFormViewProps = {
  states: {
    leadFormState: {},
    error: "",
    loading: false,
    referralCode: "ABC123",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
  },
  refs: {
    formRef: {},
  },
  content: {
    pageLabel: "Submit your information",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
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

export const Default = () => <LeadFormView {...defaultProps} />;

export const LeadSubmitWithError = () => <LeadFormView {...errorProps} />;

export const LeadSubmitLoading = () => <LeadFormView {...loadingProps} />;

export const FieldsHidden = () => {
  return (
    <sqm-lead-form
      demoData={{
        states: {
          leadFormState: {},
          error: "",
          loading: true,
          referralCode: "ABC123",
        },
      }}
    ></sqm-lead-form>
  );
};

export const SlottedInputs = () => <LeadFormView {...slottedProps} />;
