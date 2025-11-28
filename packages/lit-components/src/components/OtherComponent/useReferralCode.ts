import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';

const MessageLinkQuery = gql`
  query getReferralCode($programId: ID) {
    user: viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export const SET_CODE_COPIED = gql`
  mutation markReferralCodeCopied($referralCode: String!) {
    markReferralCodeCopied(referralCode: $referralCode) {
      referralCode {
        dateCopied
      }
    }
  }
`;

export function useReferralCode() {
  const props = {
    tooltiplifespan: 2000,
    showNotificationText: true,
  };

  const programId = useProgramId();
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();

  const { data } = useQuery(MessageLinkQuery, { programId }, !user?.jwt);

  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);
  //   const [setCopied] = useMutation(SET_CODE_COPIED);

  const copyString =
    data?.user?.referralCode ??
    // Shown during loading
    '...';

  const [open, setOpen] = useState(false);

  async function onClick() {
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
        type: 'USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT',
        meta: {
          engagementMedium,
          shareMedium: 'DIRECT',
        },
      },
    });
  }

  return {
    onClick,
    open,
    copyString: copyString,
    showNotificationText: props.showNotificationText,
  };
}
