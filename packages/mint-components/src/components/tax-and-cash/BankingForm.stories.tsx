import { h } from "@stencil/core";

export default {
  title: "Components/Banking Information Form",
};

const bankingFormProps = {
  states: {
    hideSteps: false,
    disabled: false,
    loading: false,
    formState: {
      paymentMethodChecked: "toBankAccount",
    },
    bankCountry: "US",
  },
  demo: {
    currency: "USD",
  },
  callbacks: {
    onSubmit: async () => console.log("Submit"),
    onChange: () => console.log("Submit"),
  },
  slotProps: {
    formState: {
      errors: {},
    },
  },
  refs: { formRef: { current: null } },
};

export const BankingInfoFormTesting = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        demo: {
          showInputs: true,
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormDefault = () => {
  return <sqm-banking-info-form></sqm-banking-info-form>;
};

export const BankingInfoFormDefaultLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        states: { loading: true },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormDefaultWithValidationErrors = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        demo: {
          ...bankingFormProps.demo,
          // bitset: 39,
        },
        states: {
          ...bankingFormProps.states,

          // bankCountry: null,
          formState: {
            ...bankingFormProps.states.formState,
            errors: {
              beneficiaryAccountName: true,
              bankAccountType: true,
              bankAccountNumber: true,
              iban: true,
              swiftCode: true,
              routingCode: true,
              bankName: true,
              beneficiaryClassification: true,
              patronymicName: true,
              voCode: true,
              agencyCode: true,
              bankAddress: true,
              bankCity: true,
              bankCountry: true,
              bankProvinceState: true,
              bankPostalCode: true,
              branchCode: true,
              balanceThreshold: true,
              fixedDay: true,
            },
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryUSCurrencyUSD = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: { ...bankingFormProps.states, bankCountry: "US" },
        demo: {
          ...bankingFormProps.demo,
          currency: "USD",
          // bitset: 39,
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormGeneralError = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          formState: {
            ...bankingFormProps.states.formState,
            errors: {
              general: true,
            },
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryUSCurrencyUSDLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
          loading: true,
        },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 39,
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryUSCurrencyGBP = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: { ...bankingFormProps.states, bankCountry: "US" },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 33,
          currency: "GBP",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryCanadaCurrencyCAD = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: { ...bankingFormProps.states, bankCountry: "CA" },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 37,
          currency: "CAD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryCanadaCurrencyUSD = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: { ...bankingFormProps.states, bankCountry: "CA" },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 21,
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountrySpainCurrencyUSD = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: { ...bankingFormProps.states, bankCountry: "ES" },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 25,
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormIsPartner = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          isPartner: true,
        },
        demo: {
          ...bankingFormProps.demo,
          // bitset: 25,
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormPaypalChecked = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          formState: {
            ...bankingFormProps.states.formState,
            paymentMethodChecked: "toPaypalAccount",
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormPaypalCheckedLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          loading: true,
          formState: {
            ...bankingFormProps.states.formState,
            paymentMethodChecked: "toPaypalAccount",
          },
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormWithBalanceThresholdPaymentSchedule = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "balanceThreshold",
          },
        },
        demo: {
          ...bankingFormProps.demo,
          currency: "USD",
          // bitset: 39,
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormWithBalanceThresholdPaymentScheduleWithError =
  () => {
    return (
      <sqm-banking-info-form
        demoData={{
          ...bankingFormProps,
          states: {
            ...bankingFormProps.states,
            bankCountry: "US",
            formState: {
              errors: {
                balanceThreshold: true,
              },
              ...bankingFormProps.states.formState,
              paymentScheduleChecked: "balanceThreshold",
            },
          },
          demo: {
            ...bankingFormProps.demo,
            currency: "USD",
            // bitset: 39,
          },
        }}
      ></sqm-banking-info-form>
    );
  };

export const BankingInfoFormWithFixedDayPaymentSchedule = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "fixedDay",
          },
        },
        demo: {
          ...bankingFormProps.demo,
          currency: "USD",
          // bitset: 39,
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormWithFixedDayPaymentScheduleWithError = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
          formState: {
            errors: {
              fixedDay: true,
            },
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "fixedDay",
          },
        },
        demo: {
          ...bankingFormProps.demo,
          currency: "USD",
          // bitset: 39,
        },
      }}
    ></sqm-banking-info-form>
  );
};
