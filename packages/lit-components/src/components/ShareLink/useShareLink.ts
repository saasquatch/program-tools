import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { ShareLinkProps } from './ShareLink';

const ShareLinkQuery = gql`
  query getShareLink($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useShareLink(props: ShareLinkProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const { data, loading } = useQuery(ShareLinkQuery, { programId }, !user?.jwt);
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const copyString = data?.user?.shareLink ?? '...';
  const [open, setOpen] = useState(false);

  function onClick() {
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltipLifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: 'USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT',
        meta: { engagementMedium, shareMedium: 'DIRECT' },
      },
    });
  }

  return { onClick, open, disabled: loading, loading, copyString, error: '' };
}
