import { gql } from "graphql-request";

export const TAX_CONTEXT_NAMESPACE = "sq:tax-and-cash";

export const TAX_FORM_CONTEXT_NAMESPACE = "sq:tax-form-context";

export const USER_QUERY_NAMESPACE = "sq:user-info-query";

export const COUNTRIES_NAMESPACE = "sq:countries-list";

export const CURRENCIES_NAMESPACE = "sq:currencies:list";

export type TaxContext = {
  overrideNextStep?: string;
  overrideBackStep?: string;
  hideSteps?: boolean;
};

export const GET_USER = gql`
  query getUserTaxInfo($id: String!, $accountId: String!) {
    user(id: $id, accountId: $accountId) {
      firstName
      lastName
      email
      countryCode
      customFields
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
  };
};

export const GET_COUNTRIES = gql`
  query getCurrencies {
    countries(limit: 1000) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

export type CountriesQuery = {
  countries: {
    data: {
      countryCode: string;
      displayName: string;
    }[];
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
