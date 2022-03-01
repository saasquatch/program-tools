import { useLocale, useQuery } from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";

export type Country = {
  countryCode: string;
  displayName: string;
};

const GET_COUNTRIES = gql`
  query countryList($locale: RSLocale) {
    countries(limit: 250) {
      data {
        countryCode
        displayName(locale: $locale)
      }
    }
  }
`;

export function useCountryField() {
  const locale = useLocale();
  const { data: res } = useQuery(
    GET_COUNTRIES,
    { locale }
    // TODO: where should the locale be coming from? this is used on registration where there's usually no user (thus no locale)
    // locale === undefined
  );
  return {
    data: {
      countries: res?.countries?.data,
    },
  };
}
