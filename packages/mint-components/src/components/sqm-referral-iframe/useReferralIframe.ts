import {
  useProgramId,
  useUserIdentity,
  useQuery,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { SqmReferralIframe } from "./sqm-referral-iframe";
import { ReferralIframeViewProps } from "./sqm-referral-iframe-view";

const GET_USER_DETAILS = gql`
  query getUser($programId: ID) {
    viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;

export function useReferralIframe(
  props: SqmReferralIframe
): ReferralIframeViewProps {
  const programId = useProgramId();
  const user = useUserIdentity();

  const { data } = useQuery(
    GET_USER_DETAILS,
    { programId },
    !user?.jwt || !programId
  );

  return {
    states: {
      content: props,
    },
    data: {
      shareCode: data?.viewer?.referralCode,
    },
  };
}
