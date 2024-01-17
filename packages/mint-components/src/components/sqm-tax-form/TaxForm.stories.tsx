import { h } from "@stencil/core";
import {
  TaxFormStepOneView,
  TaxFormStepOneProps,
} from "./sqm-tax-form-step-1-view";

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

export const StepOne = () => {
  return (
    <TaxFormStepOneView
      states={stepOneProps.states}
      callbacks={stepOneProps.callbacks}
      text={stepOneProps.text}
    />
  );
};

export const StepOneTest = () => {
  return <TaxFormStepOneView {...stepOneProps} />;
};

export const Test = () => {
  return <div>Does this work?</div>;
};
