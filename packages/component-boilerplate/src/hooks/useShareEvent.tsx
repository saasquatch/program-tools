import { gql } from "graphql-request";
import {
  useEngagementMedium,
  useProgramId,
  useUserIdentity,
} from "../environment/environment";
import { useMutation } from "./graphql/useMutation";

const FIRE_EVENT = gql`
  mutation($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export default function useShareEvent() {
  const engagementMedium = useEngagementMedium();
  const widgetIdent = useUserIdentity();
  const program = useProgramId();
  const [dispatch] = useMutation(FIRE_EVENT);

  if (!widgetIdent) {
    // Not logged in. No-op callback for tracking sharing.
    return () => {};
  }

  return (shareMedium: string) => {
    const variables = {
      eventMeta: {
        id: widgetIdent.id,
        accountId: widgetIdent.accountId,
        programId: program,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium: engagementMedium,
          shareMedium,
        },
      },
    };
    dispatch(variables);
  };
}
