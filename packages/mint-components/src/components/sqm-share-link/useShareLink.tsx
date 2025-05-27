import {
  useEngagementMedium,
  useMutation,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { CopyTextViewProps } from "../views/copy-text-view";
import {
  ReferralCodeContext,
  REFERRAL_CODES_NAMESPACE,
  SET_CODE_COPIED,
} from "../sqm-referral-codes/useReferralCodes";

interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
  linkOverride?: string;
}

const MessageLinkQuery = gql`
  query ($programId: ID, $engagementMedium: UserEngagementMedium!) {
    user: viewer {
      ... on User {
        shareLink(
          programId: $programId
          engagementMedium: $engagementMedium
          shareMedium: DIRECT
        )
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useShareLink(props: ShareLinkProps): CopyTextViewProps {
  const { programId = useProgramId() } = props;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();

  const contextData = useParentValue<ReferralCodeContext>(
    REFERRAL_CODES_NAMESPACE
  );

  const { data } = useQuery(
    MessageLinkQuery,
    { programId, engagementMedium },
    !user?.jwt || !!props.linkOverride || contextData?.shareLink !== undefined
  );
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const [setCopied, copiedRes] = useMutation(SET_CODE_COPIED);

  const copyString =
    (contextData?.shareLink || data?.user?.shareLink) ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);

  async function onClick() {
    if (contextData) {
      await setCopied({ referralCode: contextData.referralCode });
      contextData.refresh();
    }

    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium,
          shareMedium: "DIRECT",
        },
      },
    });
  }

  return { ...props, onClick, open, copyString: copyString };
}
