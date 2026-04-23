import { h } from "@stencil/core";
import {
  PartnerInfoModalView,
  PartnerInfoModalViewProps,
} from "./sqm-partner-info-modal-view";

export default {
  title: "Components/Partner Info Modal",
};

const demoCountries = [
  { countryCode: "US", displayName: "United States" },
  { countryCode: "CA", displayName: "Canada" },
  { countryCode: "GB", displayName: "United Kingdom" },
  { countryCode: "AU", displayName: "Australia" },
  { countryCode: "DE", displayName: "Germany" },
  { countryCode: "FR", displayName: "France" },
  { countryCode: "JP", displayName: "Japan" },
];

const demoCurrencies = [
  { currencyCode: "USD", displayName: "US Dollar" },
  { currencyCode: "CAD", displayName: "Canadian Dollar" },
  { currencyCode: "GBP", displayName: "British Pound" },
  { currencyCode: "EUR", displayName: "Euro" },
  { currencyCode: "AUD", displayName: "Australian Dollar" },
];

const noopCallbacks = {
  onCountryChange: (e: any) => console.log("Country changed:", e),
  onCurrencyChange: (e: any) => console.log("Currency changed:", e),
  onCheckboxChange: (e: any) => console.log("Checkbox changed:", e),
  setCountrySearch: (v: string) => console.log("Country search:", v),
  setCurrencySearch: (v: string) => console.log("Currency search:", v),
  onSubmit: () => console.log("Submit"),
  onClose: () => console.log("Close"),
};

const defaultText = {
  modalHeader: "Let's get you ready for rewards",
  modalHeaderExistingPartner: "We found an existing account",
  descriptionNewPartner:
    "Confirm your country and currency now to get your future rewards faster.",
  descriptionExistingPartner:
    "We noticed you are already an Impact.com partner, please confirm your information.",
  supportDescriptionExistingPartner:
    "If this is a mistake, please contact Support or sign up for this referral program with a different email.",
  countryLabel: "Country",
  currencyLabel: "Currency",
  submitButtonLabel: "Submit",
  confirmButtonLabel: "Confirm",
  searchCountryPlaceholder: "Search for a country",
  searchCurrencyPlaceholder: "Search for a currency",
  bankingCollectionText: "",
  allowBankingCollection:
    "I have read the {termsAndConditionsLink} and allow impact.com to collect my tax and banking information",
  termsAndConditionsLabel: "terms and conditions",
  termsAndConditionsLink:
    "https://terms.advocate.impact.com/PayoutTermsAndConditions.html",
};

const defaultProps: PartnerInfoModalViewProps = {
  states: {
    open: true,
    loading: false,
    submitting: false,
    isExistingPartner: false,
    countryCode: "",
    currency: "",
    error: "",
    success: false,
    brandName: "Test Brand",
    filteredCountries: demoCountries,
    filteredCurrencies: demoCurrencies,
    allowBankingCollection: false,
    checkboxError: "",
    disabled: false,
  },
  callbacks: noopCallbacks,
  text: defaultText,
};

export const NewPartnerEmpty = () => {
  return <PartnerInfoModalView {...defaultProps} />;
};

export const NewPartnerPrefilled = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      countryCode: "US",
      currency: "",
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const NewPartnerFullySelected = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      countryCode: "US",
      currency: "USD",
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const ExistingPartnerConfirm = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      isExistingPartner: true,
      countryCode: "CA",
      currency: "CAD",
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const Submitting = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      countryCode: "GB",
      currency: "GBP",
      submitting: true,
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const WithError = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      countryCode: "US",
      currency: "USD",
      error:
        "An error occurred while creating your partner account. Please try again.",
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const ValidationError = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      countryCode: "",
      currency: "",
      error: "Please select both a country and currency.",
    },
  };
  return <PartnerInfoModalView {...props} />;
};

export const Closed = () => {
  const props: PartnerInfoModalViewProps = {
    ...defaultProps,
    states: {
      ...defaultProps.states,
      open: false,
    },
  };
  return <PartnerInfoModalView {...props} />;
};
