import { gql } from "graphql-request";
import { PayoutButtonScroll } from "./sqm-payout-button-scroll";
import { useQuery } from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";

const GET_PAYOUT_DETAILS = gql`
  query getPayoutDetails {
    user: viewer {
      ... on User {
        id
        impactConnection {
          connected
          publisher {
            id
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
export function usePayoutButton(props: PayoutButtonScroll) {
  const { data, refetch } = useQuery(GET_PAYOUT_DETAILS, {});

  useEffect(() => {
    const cb = () => refetch();
    window.addEventListener("sqm:tax-form-updated", cb);
    return () => window.removeEventListener("sqm:tax-form-updated", cb);
  }, []);

  return {
    states: {
      payoutSettingsComplete:
        !!data?.user?.impactConnection?.publisher?.payoutsAccount,
    },
    text: props.getTextProps(),
  };
}
