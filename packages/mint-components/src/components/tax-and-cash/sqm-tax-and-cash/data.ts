import { gql } from "graphql-request";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export const TAX_FORM_CONTEXT_NAMESPACE = "sq:tax-form-context";

export const USER_QUERY_NAMESPACE = "sq:user-info-query";

export const USER_FORM_CONTEXT_NAMESPACE = "sq:user-form-context";

export const FINANCE_NETWORK_SETTINGS_NAMESPACE = "sq:finance-network-settings";

export const COUNTRIES_NAMESPACE = "sq:countries:list";

export const COUNTRIES_QUERY_NAMESPACE = "sq:countries:query";

export const CURRENCIES_NAMESPACE = "sq:currencies:list";

export const CURRENCIES_QUERY_NAMESPACE = "sq:currencies:query";

export type TaxDocumentType = "W9" | "W8BEN" | "W8BENE";

export type UserFormContext = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  currency: string;
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
        firstName
        lastName
        email
        countryCode
        customFields
        impactConnection {
          connectionStatus
          user {
            firstName
            lastName
          }
          publisher {
            countryCode
            currency
            requiredTaxDocumentType
            currentTaxDocument {
              status
              type
              dateCreated
            }
            withdrawalSettings {
              paypalEmailAddress
              bankCountry
              beneficiaryAccountName
              beneficiaryClassification
              beneficiaryAlternativeName
              beneficiaryTaxPayerId
              bankAccountType
              bankAccountNumber
              swiftCode
              routingCode
              voCode
              agencyCode
              bankAddress
              bankPostalCode
              bankCity
              bankState
              branchCode
              paymentSchedulingType
              paymentThreshold
              paymentDay
            }
          }
        }
      }
    }
  }
`;

type TaxDocumentStatus = "NEW" | "NOT_VERIFIED" | "ACTIVE" | "INACTIVE";
type ImpactPublisher = {
  countryCode: string;
  currency: string;
  indirectTaxId: string | null;
  requiredTaxDocumentType: TaxDocumentType | null;
  currentTaxDocument: null | {
    status: TaxDocumentStatus;
    type: TaxDocumentType;
    dateCreated: number;
  };
  withdrawalSettings: {
    paypalEmailAddress: string | null;
    bankCountry: string | null;
    beneficiaryAccountName: string | null;
    beneficiaryClassification:
      | "BUSINESS"
      | "INDIVIDUAL"
      | "CPF"
      | "CNPJ"
      | null;
    beneficiaryAlternativeName: string | null;
    beneficiaryTaxPayerId: string | null;
    bankAccountType: "CHECKING" | "SAVINGS" | "NOT_SET";
    bankAccountNumber: string | null;
    swiftCode: string | null;
    routingCode: string | null;
    voCode: string | null;
    agencyCode: string | null;
    bankAddress: string | null;
    bankPostalCode: string | null;
    bankCity: string | null;
    bankState: string | null;
    branchCode: string | null;
    paymentSchedulingType: "BALANCE_THRESHOLD" | "FIXED_DAY";
    paymentThreshold: string | null;
    paymentDay: string | null;
  };

  // TODO: Remove this comment when these fields exist
  indirectTaxOption: "SAME_COUNTRY" | "NO_TAX" | "DIFFERENT_COUNTRY";
  indirectTaxSubdivision: string;
  indirectTaxCountry: string;
  additionalTaxId: string;
  withholdingTaxCountry: string;
  withholdingTaxNumber: string;
  organizationType: string;
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
    impactConnection: null | {
      connectionStatus: "CONNECTED" | "NOT_CONNECTED";
      user: {
        firstName: string;
        lastName: string;
      };
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
  query currencies {
    currencies(limit: 300) {
      data {
        displayName
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

export type FinanceNetworkSettingsQuery = {
  impactFinanceNetworkSettings: {
    data: {
      countryCode: string;
      currency: string;
      defaultFinancePaymentMethodId: number;
      thresholdOptions: string;
      withdrawalSettingId: number;
      internationalEftFee: number;
      foreignFxFee: number;
      defaultFxFee: number;
    }[];
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
