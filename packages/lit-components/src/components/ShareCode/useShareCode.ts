import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { ShareCodeProps } from './ShareCode';

const ShareCodeQuery = gql`
  query getShareCode($programId: ID) {
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

export function useShareCode(props: ShareCodeProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const { data, loading } = useQuery(ShareCodeQuery, { programId }, !user?.jwt);
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const copyString = data?.user?.referralCode ?? '...';
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

export function useDemoShareCode(props: ShareCodeProps) {
  const [open, setOpen] = useState(false);
  const copyString = 'SHARECODE001';

  function onClick() {
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltipLifespan);
  }

  return { onClick, open, disabled: false, loading: false, copyString, error: '' };
}
