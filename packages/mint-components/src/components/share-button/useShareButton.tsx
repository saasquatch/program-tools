import { useQuery, useEngagementMedium } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareButtonViewProps } from './share-button-view';
import { PlatformNativeActions } from '../../global/android';

declare const SquatchAndroid: PlatformNativeActions | undefined;

interface ShareButtonProps extends ShareButtonViewProps {
  programId?: string;
  sharetitle?: string;
  sharetext?: string;
}

const MessageLinkQuery = gql`
  query($programId: ID, $engagementMedium: UserEngagementMedium!, $shareMedium: ReferralShareMedium!) {
    viewer {
      __typename
      ... on User {
        messageLink(programId: $programId, engagementMedium: $engagementMedium, shareMedium: $shareMedium)
      }
    }
  }
`;

function NativeShare(props: { sharetitle: string; sharetext: string }, res: any) {
  const title = props.sharetitle || 'Share title';
  const text = props.sharetext || 'Share text';

  if (res?.data?.viewer?.messageLink === 'undefined') {
    return alert('error: message link undefined!');
  }

  if (window.navigator.share) {
    window.navigator
      .share({
        title,
        text,
        url: res.data.viewer.messageLink,
      })
      .catch(error => console.error('Error on web share', error));
  } else {
    alert('Not on a supported device');
  }
}

function FacebookShare(programId: string, res: any) {
  const variables = {
    engagementMedium: useEngagementMedium(),
    programId: programId,
    shareMedium: 'DIRECT',
  };

  const directRes = useQuery(MessageLinkQuery, variables);

  if (res.data?.viewer?.messageLink === 'undefined' || directRes.data?.viewer?.messageLink === 'undefined') {
    return alert('error: message link undefined!');
  }

  if (typeof SquatchAndroid !== 'undefined') {
    return SquatchAndroid.shareOnFacebook(directRes.data.viewer.messageLink, res.data.viewer.messageLink);
  } else {
    return GenericShare(res);
  }
}

function GenericShare(res: any) {
  return res.data?.viewer?.messageLink ? window.open(res.data.viewer.messageLink) : alert('error: message link undefined!');
}

export function useShareButton(props: ShareButtonProps): ShareButtonViewProps {
  const { sharetitle, sharetext, medium, programId } = props;

  const variables = {
    engagementMedium: useEngagementMedium(),
    programId: programId,
    shareMedium: medium.toUpperCase() === 'NATIVE' ? 'DIRECT' : medium.toUpperCase(),
  };

  const res = useQuery(MessageLinkQuery, variables);

  function onClick() {
    switch (medium.toLocaleUpperCase()) {
      case 'FACEBOOK':
        FacebookShare(props.programId, res);
        break;
      case 'NATIVE':
        NativeShare({ sharetitle, sharetext }, res);
        break;
      default:
        GenericShare(res);
        break;
    }
  }

  return { ...props, onClick };
}
