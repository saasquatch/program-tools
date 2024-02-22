import { gql } from "graphql-request";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export const TAX_FORM_CONTEXT_NAMESPACE = "sq:tax-form-context";

export const USER_QUERY_NAMESPACE = "sq:user-info-query";

export const USER_FORM_CONTEXT_NAMESPACE = "sq:user-form-context";

export const COUNTRIES_NAMESPACE = "sq:countries-list";

export const CURRENCIES_NAMESPACE = "sq:currencies:list";

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
    impactPartnerCountries(limit: 1000) {
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
  impactPartnerCountries: {
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

export type CurrenciesQuery = {
  currencies: {
    data: {
      displayName: string;
      currencyCode: string;
    }[];
  };
};
