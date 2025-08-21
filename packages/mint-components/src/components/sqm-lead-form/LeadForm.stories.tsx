import { h } from "@stencil/core";
import { LeadFormView, LeadFormViewProps } from "./sqm-lead-form-view";

export default {
  title: "Components/Lead Form",
};

const defaultProps: LeadFormViewProps = {
  states: {
    success: false,
    leadFormState: {},
    error: "",
    loading: false,
    referralCode: "ABC123",
  },
  callbacks: {
    submit: () => console.log("Submit!"),
    inputFunction: () => {},
    resetForm: () => {},
  },
  refs: {
    formRef: {},
  },
  content: {
    submitLabel: "Submit",
    pageLabel: "Submit your information",
    resubmitFormLabel: "Refer Another Friend",
    requiredFieldErrorMessage: "Cannot be empty",
    invalidEmailErrorMessage: "Must be a valid email address",
    submitSuccessHeader: "Referral submitted",
    submitSuccessDescription:
      "Our team will contact your friend to see if they’re a good fit. In the meantime, you can track this referral on Activity page.",
    submitErrorHeader: "An error occurred while submitting",
    submitErrorDescription:
      "Please try again later. If the problem continues, contact Support",
  },
};

const successProps: LeadFormViewProps = {
  ...defaultProps,
  states: {
    ...defaultProps.states,
    success: true,
    error: null,
  },
  content: {
    ...defaultProps.content,
    pageLabel: "Refer your friend",
  },
};

const errorProps: LeadFormViewProps = {
  ...defaultProps,
  states: {
    ...defaultProps.states,
    error: "Something went wrong. Please try again.",
    leadFormState: {
      validationErrors: {
        firstName: "Please enter a first name",
        lastName: "Please enter a last name",
        email: "Please enter a valid email",
      },
    },
  },
};

const loadingProps: LeadFormViewProps = {
  ...defaultProps,
  states: {
    ...defaultProps.states,
    loading: true,
  },
};

const slottedProps: LeadFormViewProps = {
  ...defaultProps,
  content: {
    ...defaultProps.content,
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

export const LeadSubmitSuccess = () => <LeadFormView {...successProps} />;

export const LeadSubmitWithError = () => <LeadFormView {...errorProps} />;

export const LeadSubmitLoading = () => <LeadFormView {...loadingProps} />;

export const FieldsHidden = () => {
  return (
    <sqm-lead-form
      demoData={{
        states: {
          leadFormState: {},
          error: "",
          success: false,
          loading: true,
          referralCode: "ABC123",
        },
      }}
    ></sqm-lead-form>
  );
};

export const SlottedInputs = () => <LeadFormView {...slottedProps} />;
