import { gql } from "graphql-request";
import {
  useEngagementMedium,
  useProgramId,
  useUserIdentity,
} from "./environment";
import { useMutation } from "./graphql/useMutation";

const FIRE_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useLoadEvent() {
  const engagementMedium = useEngagementMedium();
  const userIdentity = useUserIdentity();
  const programId = useProgramId();
  const [dispatch] = useMutation(FIRE_EVENT);

  if (!userIdentity) {
    // Not logged in. No-op callback for tracking sharing.
    return () => {};
  }

  return () => {
    const variables = {
      eventMeta: {
        programId,
        id: userIdentity.id,
        accountId: userIdentity.accountId,
        type: "USER_REFERRAL_PROGRAM_LOADED_EVENT",
        meta: {
          engagementMedium,
        },
      },
    };
    dispatch(variables);
  };
}
