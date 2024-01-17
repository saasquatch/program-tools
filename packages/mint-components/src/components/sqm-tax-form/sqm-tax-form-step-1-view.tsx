import { h } from "@stencil/core";

export interface TaxFormStepOneProps {
  states: {
    loading: boolean;
    formState: {
      firstName: string;
      lastName: string;
      email: string;
      country: string;
      currency: string;
      indirectTaxNumber: string;
      allowBankingCollection: boolean;
      errors: any;
      error: string;
    };
  };
  callbacks: {
    onSubmit: (props: any) => void;
    onChange: (e) => void;
  };
  text: {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    currency: string;
    indirectTaxNumber: string;
    allowBankingCollection: string;
    submitButton: string;
  };
}

const TaxFormStepOneView = (props: TaxFormStepOneProps) => {
  const {
    states,
    states: { formState },
    callbacks,
    text,
  } = props;

  return (
    <form class="FormWrapper" onSubmit={callbacks.onSubmit}>
      <sl-input
        exportparts="label: input-label"
        value={formState.firstName}
        onInput={callbacks.onChange}
        label={text.firstName}
        disabled={states.loading}
        // Copied from edit form, may need to keep
        // {...(formState.errors.firstName &&
        // formState.errors.firstName.status !== "valid"
        //   ? { class: "ErrorStyles", helpText: "Cannot be empty" }
        //   : [])}
        id="firstName"
        name="firstName"
        error={
          formState.errors.firstName &&
          formState.errors.firstName.status !== "valid"
            ? formState.errors.firstName.message
            : undefined
        }
      />
      <sl-input
        exportparts="label: input-label"
        value={formState.lastName}
        onInput={callbacks.onChange}
        label={text.lastName}
        disabled={states.loading}
        // Copied from edit form, may need to keep
        // {...(formState.errors.lastName &&
        // formState.errors.lastName.status !== "valid"
        //   ? { class: "ErrorStyles", helpText: "Cannot be empty" }
        //   : [])}
        id="lastName"
        name="lastName"
        error={
          formState.errors.lastName &&
          formState.errors.lastName.status !== "valid"
            ? formState.errors.lastName.message
            : undefined
        }
      />
    </form>
  );
};

export default TaxFormStepOneView;
