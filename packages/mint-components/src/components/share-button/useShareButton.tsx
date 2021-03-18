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

const ShareLinkQuery = gql`
  query($programId: ID, $engagementMedium: UserEngagementMedium!) {
    viewer {
      __typename
      ... on User {
        shareLink(programId: $programId, engagementMedium: $engagementMedium)
      }
    }
  }
`;

function NativeShare(props: { sharetitle: string; sharetext: string }, directLink: string) {
  const title = props.sharetitle || 'Share title';
  const text = props.sharetext || 'Share text';

  if (directLink === 'undefined') {
    return alert('error: message link undefined!');
  }

  if (window.navigator.share) {
    window.navigator
      .share({
        title,
        text,
        url: directLink,
      })
      .catch(error => console.error('Error on web share', error));
  } else {
    alert('Not on a supported device');
  }
}

function FacebookShare(directLink: string, res: any) {
  if (res.data?.viewer?.messageLink === 'undefined' || directLink === 'undefined') {
    return alert('error: message link undefined!');
  }

  if (typeof SquatchAndroid.shareOnFacebook !== 'undefined') {
    return SquatchAndroid.shareOnFacebook(directLink, res.data.viewer.messageLink);
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
    shareMedium: medium.toUpperCase(),
  };

  const res = useQuery(MessageLinkQuery, variables);

  const directVariables = {
    engagementMedium: useEngagementMedium(),
    programId: programId,
  };

  const directLink = useQuery(ShareLinkQuery, directVariables)?.data?.viewer?.shareLink;

  function onClick() {
    switch (medium.toLocaleUpperCase()) {
      case 'FACEBOOK':
        FacebookShare(directLink, res);
        break;
      case 'DIRECT':
        NativeShare({ sharetitle, sharetext }, directLink);
        break;
      default:
        GenericShare(res);
        break;
    }
  }

  return { ...props, onClick };
}
