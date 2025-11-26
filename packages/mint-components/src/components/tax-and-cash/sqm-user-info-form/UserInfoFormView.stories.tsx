// @ts-nocheck
import { h } from "@stencil/core";
import {
  UserInfoFormView,
  UserInfoFormViewProps,
} from "./sqm-user-info-form-view";

export default {
  title: "Components/User Info Form View",
};

const mockCountries = [
  { countryCode: "US", displayName: "United States" },
  { countryCode: "CA", displayName: "Canada" },
  { countryCode: "GB", displayName: "United Kingdom" },
  { countryCode: "AU", displayName: "Australia" },
  { countryCode: "DE", displayName: "Germany" },
  { countryCode: "FR", displayName: "France" },
  { countryCode: "ES", displayName: "Spain" },
];

const mockCurrencies = [
  { currencyCode: "USD", displayName: "US Dollar" },
  { currencyCode: "CAD", displayName: "Canadian Dollar" },
  { currencyCode: "GBP", displayName: "British Pound" },
  { currencyCode: "EUR", displayName: "Euro" },
  { currencyCode: "AUD", displayName: "Australian Dollar" },
];

const mockUSRegions = [
  { label: "California", value: "CA" },
  { label: "New York", value: "NY" },
  { label: "Texas", value: "TX" },
  { label: "Florida", value: "FL" },
  { label: "Washington", value: "WA" },
];

const mockPartnerData = {
  id: "partner-123",
  brandedSignup: true,
  countryCode: "US",
  currency: "USD",
  billingAddress: "123 Main St",
  billingCity: "San Francisco",
  billingState: "CA",
  billingCountryCode: "US",
  billingPostalCode: "94102",
  phoneNumberCountryCode: "US",
  phoneNumber: "4155551234",
  currentTaxDocument: null,
  taxInformation: null,
  requiredTaxDocumentType: null,
  withdrawalSettings: {
    paymentMethod: "PAYPAL",
    paypalEmailAddress: null,
    bankCountry: null,
    bankAccountNumber: null,
    paymentSchedulingType: "BALANCE_THRESHOLD",
    paymentThreshold: null,
    paymentDay: null,
  },
  payoutsAccount: {
    hold: false,
    holdReasons: [],
    balance: "0",
  },
};

const defaultText = {
  formStep: "Step {step} of {count}",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  country: "Country",
  phoneNumber: "Phone Number",
  address: "Address",
  city: "City",
  state: "State",
  province: "Province",
  region: "Region",
  postalCode: "Postal Code",
  currency: "Currency",
  currencyHelpText: "Select your preferred currency for payouts",
  allowBankingCollection: "I agree to the {termsAndConditionsLink}",
  personalInformation: "Personal Information",
  continueButton: "Continue",
  isPartnerAlertHeader: "Partner Account Detected",
  isPartnerAlertDescription:
    "Some fields are pre-filled from your partner account. Contact {supportLink} if you need to make changes.",
  termsAndConditionsLabel: "Terms and Conditions",
  termsAndConditionsLink: "https://example.com/terms",
  taxAndPayoutsDescription:
    "Please provide your information for tax and payout purposes.",
  supportLink: "support@example.com",
  error: {
    generalTitle: "Error",
    generalDescription:
      "An error occurred. Please contact {supportLink} for assistance.",
    invalidCharacterError: "Invalid characters detected",
    fieldRequiredError: "{fieldName} is required",
    fieldInvalidError: "Invalid value",
    loadingErrorAlertHeader: "Loading Error",
    loadingErrorAlertDescription:
      "Failed to load form data. Please contact {supportLink}.",
  },
  searchForCountryText: "Search for country...",
  searchForCurrencyText: "Search for currency...",
};

const baseProps: UserInfoFormViewProps = {
  states: {
    step: "1",
    hideState: false,
    hideSteps: false,
    disabled: false,
    loadingError: false,
    loading: false,
    isPartner: false,
    isUser: false,
    formState: {
      firstName: "",
      lastName: "",
      email: "user@example.com",
      countryCode: "US",
      currency: "USD",
      phoneNumberCountryCode: "US",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      allowBankingCollection: false,
      errors: {},
    },
  },
  data: {
    regionLabelEnum: "STATE",
    regions: mockUSRegions,
    countries: mockCountries,
    phoneCountries: mockCountries,
    allCountries: mockCountries,
    allCurrencies: mockCurrencies,
    currencies: mockCurrencies,
    partnerData: undefined,
  },
  callbacks: {
    setCurrencySearch: (c) => console.log("setCurrencySearch", c),
    setCountrySearch: (c) => console.log("setCountrySearch", c),
    setPhoneCountrySearch: (c) => console.log("setPhoneCountrySearch", c),
    onSubmit: (props) => console.log("onSubmit", props),
    onFormChange: (field, e) => console.log("onFormChange", field, e),
  },
  text: defaultText,
  refs: {
    formRef: { current: null },
    currencyRef: { current: null },
    phoneCountryRef: { current: null },
  },
};

export const Default = () => {
  return <UserInfoFormView {...baseProps} />;
};

export const WithPrefilledData = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        formState: {
          ...baseProps.states.formState,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          countryCode: "US",
          currency: "USD",
          phoneNumberCountryCode: "US",
          phoneNumber: "4155551234",
          address: "123 Main St",
          city: "San Francisco",
          state: "CA",
          postalCode: "94102",
        },
      }}
    />
  );
};

export const Loading = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        loading: true,
      }}
    />
  );
};

export const LoadingError = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        loadingError: true,
      }}
    />
  );
};

export const WithValidationErrors = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        formState: {
          ...baseProps.states.formState,
          firstName: "John",
          lastName: "Doe",
          errors: {
            firstName: "First Name is required",
            lastName: "Last Name is required",
            phoneNumber: "Phone Number is required",
            address: "Address contains invalid characters",
            city: "City is required",
            state: "State is required",
            postalCode: "Postal Code is required",
            currency: "Currency is required",
            countryCode: "Country is required",
            allowBankingCollection: "You must accept the terms and conditions",
          },
        },
      }}
    />
  );
};

export const WithGeneralError = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        formState: {
          ...baseProps.states.formState,
          errors: {
            general: true,
          },
        },
      }}
    />
  );
};

export const PartnerAccount = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        isPartner: true,
        formState: {
          ...baseProps.states.formState,
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@example.com",
          countryCode: "US",
          currency: "USD",
          phoneNumberCountryCode: "US",
          phoneNumber: "4155551234",
          address: "123 Main St",
          city: "San Francisco",
          state: "CA",
          postalCode: "94102",
        },
      }}
      data={{
        ...baseProps.data,
        partnerData: mockPartnerData,
      }}
    />
  );
};

export const UserAccount = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        isUser: true,
        formState: {
          ...baseProps.states.formState,
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob.johnson@example.com",
        },
      }}
    />
  );
};

export const UserAccountMissingLastName = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        isUser: true,
        formState: {
          ...baseProps.states.formState,
          firstName: "Bob",
          lastName: undefined,
          email: "bob.johnson@example.com",
        },
      }}
    />
  );
};

export const CanadianAddress = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        formState: {
          ...baseProps.states.formState,
          firstName: "Alice",
          lastName: "Martin",
          countryCode: "CA",
          state: "BC",
        },
      }}
      data={{
        ...baseProps.data,
        regionLabelEnum: "PROVINCE",
        regions: [
          { label: "British Columbia", value: "BC" },
          { label: "Ontario", value: "ON" },
          { label: "Quebec", value: "QC" },
          { label: "Alberta", value: "AB" },
        ],
      }}
    />
  );
};

export const NoStateRegion = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        hideState: true,
        formState: {
          ...baseProps.states.formState,
          firstName: "Pierre",
          lastName: "Dubois",
          countryCode: "FR",
        },
      }}
      data={{
        ...baseProps.data,
        regionLabelEnum: undefined,
        regions: [],
      }}
    />
  );
};

export const HideSteps = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        hideSteps: true,
      }}
    />
  );
};

export const DisabledForm = () => {
  return (
    <UserInfoFormView
      {...baseProps}
      states={{
        ...baseProps.states,
        disabled: true,
        formState: {
          ...baseProps.states.formState,
          firstName: "Disabled",
          lastName: "User",
        },
      }}
    />
  );
};
