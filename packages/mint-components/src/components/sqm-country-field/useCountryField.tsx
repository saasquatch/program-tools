import { useQuery } from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";

export type Country = {
  countryCode: string;
  displayName: string;
};

const GET_COUNTRIES = gql`
  query countryList {
    countries(limit: 250) {
      data {
        countryCode
        displayName
      }
    }
  }
`;

export function useCountryField() {
  const { data: res } = useQuery(GET_COUNTRIES, {});
  return {
    data: {
      countries: res?.countries?.data,
    },
  };
}
