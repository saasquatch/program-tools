import {
  useLocale,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { CountryField } from "./sqm-country-field";

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

export function useCountryField(props: CountryField) {

  const user = useUserIdentity();
  const locale = props.locale || useLocale();
  const { data: res } = useQuery(
    GET_COUNTRIES,
    { locale },
    user && locale === undefined
  );
  return {
    data: {
      countries: res?.countries?.data,
    },
  };
}
