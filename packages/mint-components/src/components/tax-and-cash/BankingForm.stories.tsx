import { h } from "@stencil/core";
import { StoryDemoData } from "../../global/demo";
import { BankingInfoFormViewProps } from "./sqm-banking-info-form/sqm-banking-info-form-view";

export default {
  title: "Components/Banking Information Form",
};

const bankingFormProps: StoryDemoData<BankingInfoFormViewProps> = {
  states: {
    hideSteps: false,
    disabled: false,
    loading: false,
    formState: {
      paymentMethodChecked: "toBankAccount",
    },
    hasPayPal: false,
    isPartner: false,
    saveDisabled: false,
    thresholds: [],
    bankCountry: "US",
    currency: "USD",
    loadingError: false,
  },

  callbacks: {
    onSubmit: async () => console.log("Submit"),
    setPaymentMethodChecked: () => {},
    setPaymentScheduleChecked: () => {},
  },
  refs: { formRef: { current: null } },
};

export const BankingInfoFormDefault = () => {
  return <sqm-banking-info-form></sqm-banking-info-form>;
};

export const BankingInfoFormDefaultLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        states: { ...bankingFormProps.states, loading: true },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormDefaultWithLoadingError = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        states: {
          ...bankingFormProps.states,
          loading: true,
          loadingError: true,
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormDefaultWithValidationErrors = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        states: {
          ...bankingFormProps.states,

          // bankCountry: null,
          formState: {
            ...bankingFormProps.states.formState,
            errors: {
              inputErrors: {
                beneficiaryAccountName: { type: "required" },
                bankAccountType: { type: "required" },
                bankAccountNumber: { type: "required" },
                iban: { type: "required" },
                swiftCode: { type: "required" },
                routingCode: { type: "required" },
                bankName: { type: "required" },
                beneficiaryClassification: { type: "required" },
                patronymicName: { type: "required" },
                voCode: { type: "required" },
                agencyCode: { type: "required" },
                bankAddress: { type: "required" },
                bankCity: { type: "required" },
                bankCountry: { type: "required" },
                bankState: { type: "required" },
                bankPostalCode: { type: "required" },
                branchCode: { type: "required" },
                balanceThreshold: { type: "required" },
                fixedDay: { type: "required" },
              },
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
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
          currency: "USD",
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
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryARCurrencyARS = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "AR",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "FIXED_DAY",
            paymentMethodChecked: "toBankAccount",
          },
          currency: "ARS",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormCountryMXCurrencyMXN = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          bankCountry: "MX",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "FIXED_DAY",
            paymentMethodChecked: "toBankAccount",
          },
          currency: "MXN",
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
        states: {
          ...bankingFormProps.states,
          bankCountry: "US",
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
        states: {
          ...bankingFormProps.states,
          bankCountry: "CA",
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
        states: {
          ...bankingFormProps.states,
          bankCountry: "CA",
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
        states: {
          ...bankingFormProps.states,
          bankCountry: "ES",
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
            paymentMethodChecked: "toPayPalAccount",
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
            paymentMethodChecked: "toPayPalAccount",
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
            paymentScheduleChecked: "BALANCE_THRESHOLD",
          },
          currency: "USD",
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
                inputErrors: {
                  balanceThreshold: { type: "required" },
                },
              },
              ...bankingFormProps.states.formState,
              paymentScheduleChecked: "BALANCE_THRESHOLD",
            },
            currency: "USD",
          },
        }}
      ></sqm-banking-info-form>
    );
  };

export const BankingInfoFormWithBalanceThresholdPaymentScheduleLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          loading: true,
          bankCountry: "US",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "BALANCE_THRESHOLD",
          },
          currency: "USD",
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
            paymentScheduleChecked: "FIXED_DAY",
          },
          currency: "USD",
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
              inputErrors: { fixedDay: { type: "required" } },
            },
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "FIXED_DAY",
          },
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};

export const BankingInfoFormWithFixedDayPaymentScheduleLoading = () => {
  return (
    <sqm-banking-info-form
      demoData={{
        ...bankingFormProps,
        states: {
          ...bankingFormProps.states,
          loading: true,
          bankCountry: "US",
          formState: {
            ...bankingFormProps.states.formState,
            paymentScheduleChecked: "FIXED_DAY",
          },
          currency: "USD",
        },
      }}
    ></sqm-banking-info-form>
  );
};
