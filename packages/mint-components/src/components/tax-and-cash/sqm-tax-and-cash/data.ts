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
        impactPartner {
          connectionStatus
          firstName
          lastName
          email
          country
          currency
          indirectTaxNumber
          requiredTaxDocumentType
          currentTaxDocument {
            status
            type
          }
        }
      }
      # ... on Tenant {
      #   impactBrandCountryCode
      # }
    }
  }
`;

export type UserQuery = {
  user: {
    firstName?: string;
    lastName?: string;
    email?: string;
    countryCode?: string;
    customFields?: {
      [key: string]: any;
    };
    impactPartner: null | {
      connectionStatus: "CONNECTED" | "NOT_CONNECTED";
      firstName: string;
      lastName: string;
      email: string;
      country: string;
      currency: string;
      indirectTaxNumber: number;
      requiredTaxDocumentType: TaxDocumentType;
      currentTaxDocument: {
        status: "NEW" | "NOT_VERIFIED" | "ACTIVE" | "INACTIVE";
        type: TaxDocumentType;
      };

      // TODO: Remove this comment when these fields exist
      indirectTaxOption: "SAME_COUNTRY" | "NO_TAX" | "DIFFERENT_COUNTRY";
      indirectTaxSubdivision: string;
      indirectTaxCountry: string;
      indirectTaxId: string;
      additionalTaxId: string;
      withholdingTaxCountry: string;
      withholdingTaxNumber: string;
      organizationType: string;
    };
  };
};

export const GET_COUNTRIES = gql`
  query getCurrencies {
    impactPartnerCountries(limit: 1000) {
      data {
        countryCode
        impactCountryCode
        displayName
      }
    }
  }
`;

export type TaxCountry = {
  impactCountryCode: string;
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
