import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { ReferralIframeProps } from './ReferralIframe';

const IFRAME_QUERY = gql`
  query getShareLink($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;

export function useReferralIframe(props: ReferralIframeProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(IFRAME_QUERY, { programId }, !user?.jwt);

  const shareLink = data?.user?.shareLink || '';
  const url = props.iframeUrl
    ? `${props.iframeUrl}${props.iframeUrl.includes('?') ? '&' : '?'}shareLink=${encodeURIComponent(shareLink)}`
    : '';

  return { url, loading };
}

export function useDemoReferralIframe(props: ReferralIframeProps) {
  const shareLink = 'https://www.example.com/sharelink/abc';
  const url = props.iframeUrl
    ? `${props.iframeUrl}${props.iframeUrl.includes('?') ? '&' : '?'}shareLink=${encodeURIComponent(shareLink)}`
    : '';

  return { url, loading: false };
}
