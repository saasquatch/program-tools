import { h } from "@stencil/core";
import {
  TaxFormStepOneView,
  TaxFormStepOneProps,
} from "./sqm-tax-form-step-1-view";
import {
  TaxFormStepTwoProps,
  TaxFormStepTwoView,
} from "./sqm-tax-form-step-2-view";

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
