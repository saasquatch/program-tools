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
      countryCode: "US",
      currency: "fghdfgsd",
      indirectTaxNumber: "sfgdfdgs",
      allowBankingCollection: true,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
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
      checked: undefined,
    },
  },
  callbacks: {
    onSubmit: (props: any) => console.log("Submit"),
    onChange: (e) => console.log("Submit"),
    onBack: () => console.log("Submit"),
  },
  text: {
    step: "Step",
    stepOf: "of",
    indirectTax: "Indirect Tax",
    indirectTaxDescription:
      "Indirect Taxes (e.g. VAT, HST, GST) are transactional based taxes that are required to be levied by service providers by most tax authorities.",
    indirectTaxDetails: "Indirect Tax Details",
    indirectTaxDetailsDescription:
      "Not sure if you are registered for indirect tax? Contact our Support team to find out more.",
    hstCanada: "I am registered for HST in Canada",
    otherRegion:
      "I am registered for Indirect Tax in a different Country / Region",
    notRegistered: "I am not registered for Indirect Tax",
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

export const StepTwoHSTChecked = () => {
  return (
    <TaxFormStepTwoView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "hstCanada",
        },
      }}
    />
  );
};

export const StepTwoOtherRegionChecked = () => {
  return (
    <TaxFormStepTwoView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "otherRegion",
        },
      }}
    />
  );
};

export const StepTwoNotRegisteredChecked = () => {
  return (
    <TaxFormStepTwoView
      {...stepTwoProps}
      states={{
        ...stepTwoProps.states,
        formState: {
          ...stepTwoProps.states.formState,
          checked: "notRegistered",
        },
      }}
    />
  );
};
