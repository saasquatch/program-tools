import { gql } from "graphql-request";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export const TAX_FORM_CONTEXT_NAMESPACE = "sq:tax-form-context";

export const USER_QUERY_NAMESPACE = "sq:user-info-query";

export const USER_FORM_CONTEXT_NAMESPACE = "sq:user-form-context";

export const FINANCE_NETWORK_SETTINGS_NAMESPACE = "sq:finance-network-settings";

export const COUNTRIES_NAMESPACE = "sq:countries:list";

export const SORTED_COUNTRIES_NAMESPACE = "sq:countries:sorted";

export const COUNTRIES_QUERY_NAMESPACE = "sq:countries:query";

export const CURRENCIES_NAMESPACE = "sq:currencies:list";

export const CURRENCIES_QUERY_NAMESPACE = "sq:currencies:query";

export type TaxDocumentType = "W9" | "W8BEN" | "W8BENE";

export type UserFormContext = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumberCountryCode: string;
  phoneNumber: string;
  countryCode: string;
  currency: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

export type TaxContext = {
  overrideNextStep?: string;
  overrideBackStep?: string;
  hideSteps?: boolean;
};

export const GET_USER = gql`
  query getUserTaxInfo {
    user: viewer {
      ... on User {
        id
        firstName
        lastName
        email
        countryCode
        customFields
        managedIdentity {
          uid
          email
          emailVerified
        }
        impactConnection {
          connected
          user {
            firstName
            lastName
          }
          publisher {
            id
            brandedSignup
            countryCode
            currency
            billingAddress
            billingCity
            billingState
            billingCountryCode
            billingPostalCode
            phoneNumberCountryCode
            phoneNumber
            taxInformation {
              indirectTaxId
              indirectTaxCountryCode
              indirectTaxRegion
              additionalTaxId
              withholdingTaxId
              withholdingTaxCountryCode
            }
            requiredTaxDocumentType
            currentTaxDocument {
              status
              type
              dateCreated
            }
            withdrawalSettings {
              paymentMethod
              paypalEmailAddress
              bankCountry
              bankAccountNumber
              paymentSchedulingType
              paymentThreshold
              paymentDay
            }
            payoutsAccount {
              hold
              balance
            }
          }
        }
      }
    }
  }
`;

type TaxDocumentStatus = "NEW" | "NOT_VERIFIED" | "ACTIVE" | "INACTIVE";
export type ImpactPublisher = {
  id: string;
  brandedSignup: boolean;
  countryCode: string;
  currency: string;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingCountryCode: string | null;
  billingPostalCode: string | null;
  phoneNumberCountryCode: string | null;
  phoneNumber: string | null;
  currentTaxDocument: null | {
    status: TaxDocumentStatus;
    type: TaxDocumentType;
    dateCreated: number;
  };
  taxInformation: null | {
    indirectTaxId: string | null;
    indirectTaxCountryCode: string;
    indirectTaxRegion: string | null;
    additionalTaxId: string | null;
    withholdingTaxId: string | null;
    withholdingTaxCountryCode: string | null;
  };
  requiredTaxDocumentType: TaxDocumentType | null;
  withdrawalSettings: {
    paymentMethod: "PAYPAL" | "BANK_TRANSFER";
    paypalEmailAddress: string | null;
    bankCountry: string | null;
    bankAccountNumber: string | null;
    paymentSchedulingType: "BALANCE_THRESHOLD" | "FIXED_DAY";
    paymentThreshold: string | null;
    paymentDay: string | null;
  };
  payoutsAccount: {
    hold: boolean;
    balance: string;
  };
};
export type UserQuery = {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    countryCode?: string;
    customFields?: {
      [key: string]: any;
    };
    managedIdentity?: {
      uid: string;
      email: string;
      emailVerified: boolean;
    } | null;
    impactConnection: null | {
      connected: boolean;
      user: {
        firstName: string;
        lastName: string;
      } | null;
      publisher: null | ImpactPublisher;
    };
  };
};

export const GET_COUNTRIES = gql`
  query getCountries {
    impactPayoutCountries(limit: 1000) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

export type TaxCountry = {
  countryCode: string;
  displayName: string;
};
export type CountriesQuery = {
  impactPayoutCountries: {
    data: TaxCountry[];
  };
};

export const GET_CURRENCIES = gql`
  query currencies($locale: RSLocale) {
    currencies(limit: 300) {
      data {
        displayName(locale: $locale)
        currencyCode
      }
    }
  }
`;

export type Currencies = {
  displayName: string;
  currencyCode: string;
}[];

export type CurrenciesQuery = {
  currencies: { data: Currencies };
};

export type FinanceNetworkSetting = {
  countryCode: string;
  currency: string;
  defaultFinancePaymentMethodId: number;
  thresholdOptions: string;
  withdrawalSettingId: number;
  internationalEftFee: number;
  foreignFxFee: number;
  defaultFxFee: number;
};

export type FinanceNetworkSettingsQuery = {
  impactFinanceNetworkSettings: {
    data: FinanceNetworkSetting[];
    totalCount: number;
  };
};

export const GET_FINANCE_NETWORK_SETTINGS = gql`
  query impactFinanceNetworkSettings(
    $filter: ImpactFinanceNetworkSettingsFilterInput
  ) {
    impactFinanceNetworkSettings(filter: $filter, limit: 1000) {
      data {
        countryCode
        currency
        defaultFinancePaymentMethodId
        thresholdOptions
        withdrawalSettingId
        internationalEftFee
        foreignFxFee
        defaultFxFee
      }
      totalCount
    }
  }
`;

export const FORM_STEPS = 4;
