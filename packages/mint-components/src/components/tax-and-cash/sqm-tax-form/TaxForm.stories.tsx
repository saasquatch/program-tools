import { h } from "@stencil/core";
import {
  TaxFormStepOneView,
  TaxFormStepOneProps,
} from "./sqm-tax-form-step-1-view";
import {
  TaxFormStepTwoProps,
  TaxFormStepTwoView,
} from "./sqm-tax-form-step-2-view";
import {
  TaxDocumentSubmittedProps,
  TaxDocumentSubmittedView,
} from "./sqm-tax-document-submitted-view";

export default {
  title: "Components/Tax Form",
};

const stepOneProps: TaxFormStepOneProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      firstName: "Bob",
      lastName: "Testerson",
      email: "bobtesterson@example.com",
      country: "US",
      currency: "fghdfgsd",
      indirectTaxNumber: "sfgdfdgs",
      allowBankingCollection: true,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
    onChange: (e) => console.log("Submit"),
  },
  text: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    country: "Country",
    currency: "Currency",
    indirectTaxNumber: "Indirect Tax Number",
    allowBankingCollection:
      "I allow impact.com to collect my tax and banking information",
    submitButton: "Continue",
  },
  refs: {
    formRef: () => {},
  },
};

const stepTwoProps: TaxFormStepTwoProps = {
  states: {
    loading: false,
    submitDisabled: false,
    formState: {
      checked: "w9",
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
    onChange: (e) => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  text: {
    w9: "W9: For all partners based in the United States (for all individuals and entities).",
    w8: "W8-BEN: For individuals not in the United States partnered with brands based in the United States.",
    w8e: "W8-BEN-E: for entities not in the United States partnered with brads based in the United States",
    submitButton: "Continue",
    backButton: "Back",
  },
};

const documentSubmittedActiveProps: TaxDocumentSubmittedProps = {
  states: {
    status: "ACTIVE",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    status: "ACTIVE",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
};

const documentSubmittedNotVerifiedProps: TaxDocumentSubmittedProps = {
  states: {
    status: "NOT_VERIFIED",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    status: "NOT_VERIFIED",
    documentType: "W9",
    dateSubmitted: "Jan 18th, 2025",
  },
};
const documentSubmittedNotActiveProps: TaxDocumentSubmittedProps = {
  states: {
    status: "NOT_ACTIVE",
    documentType: "W8-BEN",
    dateSubmitted: "Jan 18th, 2025",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    status: "NOT_ACTIVE",
    documentType: "W8-BEN",
    dateSubmitted: "Jan 18th, 2025",
  },
};

const documentSubmittedExpiredProps: TaxDocumentSubmittedProps = {
  states: {
    status: "EXPIRED",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Jan 18th, 2026",
  },
  callbacks: { onClick: () => console.log("Submit new Form") },
  text: {
    status: "EXPIRED",
    documentType: "W8-BEN-E",
    dateSubmitted: "Jan 18th, 2025",
    dateExpired: "Jan 18th, 2026",
  },
};

export const StepOne = () => {
  return <TaxFormStepOneView {...stepOneProps} />;
};

export const StepOneLoading = () => {
  return (
    <TaxFormStepOneView
      {...stepOneProps}
      states={{ ...stepOneProps.states, loading: true }}
    />
  );
};

export const StepOneDisabled = () => {
  return (
    <TaxFormStepOneView
      {...stepOneProps}
      states={{ ...stepOneProps.states, submitDisabled: true }}
    />
  );
};

export const StepOneWithError = () => {
  return (
    <TaxFormStepOneView
      {...stepOneProps}
      states={{
        ...stepOneProps.states,
        formState: {
          ...stepOneProps.states.formState,
          errors: {
            firstName: {
              status: "invalid",
              message: "Please enter your first name",
            },
          },
        },
      }}
    />
  );
};

export const StepTwo = () => {
  return <TaxFormStepTwoView {...stepTwoProps} />;
};

export const TaxDocumentSubmittedActive = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedActiveProps} />;
};

export const TaxDocumentSubmittedNotVerified = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedNotVerifiedProps} />;
};

export const TaxDocumentSubmittedNotActive = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedNotActiveProps} />;
};

export const TaxDocumentSubmittedExpired = () => {
  return <TaxDocumentSubmittedView {...documentSubmittedExpiredProps} />;
};
