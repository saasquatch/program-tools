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
        <sqm-lead-input-field
          field-name="firstName"
          field-label="First Name"
          field-type="text"
          required-field-error-message="Please enter a first name"
        ></sqm-lead-input-field>
        <sqm-lead-input-field
          field-name="lastName"
          field-label="Last Name"
          field-type="text"
          required-field-error-message="Please enter a last name"
        ></sqm-lead-input-field>
        <sqm-lead-input-field
          field-name="email"
          field-label="Email"
          field-type="email"
          required-field-error-message="Please enter a valid email address"
        ></sqm-lead-input-field>
        <sqm-lead-dropdown-field></sqm-lead-dropdown-field>
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
