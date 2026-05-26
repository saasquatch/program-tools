import {
  useEngagementMedium,
  useMutation,
  useProgramId,
  useQuery,
  useUserIdentity,
} from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { ShareButtonProps } from './ShareButton';

const ShareLinkQuery = gql`
  query getShareLink($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
        referralCode(programId: $programId)
        messageLink(programId: $programId, shareMedium: UNKNOWN, engagementMedium: EMBED)
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useShareButton(props: ShareButtonProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const medium = props.medium || 'facebook';
  const { data, loading } = useQuery(ShareLinkQuery, { programId }, !user?.jwt);
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);

  const shareLink = data?.user?.shareLink || '';
  const messageLink = data?.user?.messageLink || shareLink;

  function getShareUrl() {
    const text = props.messageText || `Check this out: ${shareLink}`;
    const subject = props.emailSubject || 'Check this out!';
    const body = props.emailBody || text;

    switch (medium) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(text)}`;
      case 'email':
        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      case 'sms':
        return `sms:?&body=${encodeURIComponent(text)}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareLink)}`;
      case 'pinterest':
        return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareLink)}&description=${encodeURIComponent(text)}`;
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      case 'linemessenger':
        return `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
      case 'fbmessenger':
        return `fb-messenger://share/?link=${encodeURIComponent(shareLink)}`;
      case 'reminder':
        return messageLink;
      default:
        return shareLink;
    }
  }

  function onClick() {
    const url = getShareUrl();
    if (medium === 'email' || medium === 'sms') {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'width=600,height=400');
    }
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: 'USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT',
        meta: { engagementMedium, shareMedium: medium.toUpperCase() },
      },
    });
  }

  return { onClick, loading, disabled: loading, shareLink };
}

export function useDemoShareButton(props: ShareButtonProps) {
  const medium = props.medium || 'facebook';
  const shareLink = 'https://www.example.com/sharelink/abc';
  const messageLink = shareLink;

  function getShareUrl() {
    const text = props.messageText || `Check this out: ${shareLink}`;
    const subject = props.emailSubject || 'Check this out!';
    const body = props.emailBody || text;

    switch (medium) {
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink)}&text=${encodeURIComponent(text)}`;
      case 'email':
        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      case 'sms':
        return `sms:?&body=${encodeURIComponent(text)}`;
      case 'linkedin':
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareLink)}`;
      case 'pinterest':
        return `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareLink)}&description=${encodeURIComponent(text)}`;
      case 'whatsapp':
        return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      case 'linemessenger':
        return `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
      case 'fbmessenger':
        return `fb-messenger://share/?link=${encodeURIComponent(shareLink)}`;
      case 'reminder':
        return messageLink;
      default:
        return shareLink;
    }
  }

  function onClick() {
    const url = getShareUrl();
    if (medium === 'email' || medium === 'sms') {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'width=600,height=400');
    }
  }

  return { onClick, loading: false, disabled: false, shareLink };
}
