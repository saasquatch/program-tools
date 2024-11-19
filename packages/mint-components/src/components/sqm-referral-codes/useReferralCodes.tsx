import {
  usePaginatedQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { ReferralCodes } from "./sqm-referral-codes";

const GET_REFERRAL_CODES = gql`query getReferralCodes {
}`;

export function useReferralCodes(props: ReferralCodes) {
  const user = useUserIdentity();

  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<Referral>(
    GET_REFERRAL_CODES,
    (data) => data?.viewer?.referralCodes,
    {
      limit: 1,
      offset: 0,
    },
    {},
    !user?.jwt
  );

  console.log({ referralData });

  return {
    states: {
      ...states,
    },
    data: {
      referralData,
    },
    callbacks: {
      onPrev: () => callbacks.setCurrentPage(states.currentPage - 1),
      onNext: () => callbacks.setCurrentPage(states.currentPage + 1),
    },
  };
}
