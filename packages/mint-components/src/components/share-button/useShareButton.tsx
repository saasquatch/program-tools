import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareButtonViewProps } from './share-button-view';

interface ShareButtonProps extends ShareButtonViewProps {
  variables?: {
    programId: string;
    engagementMedium: string;
  };
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

export function useShareButton(props: ShareButtonProps): ShareButtonViewProps {
  const variables = {
    ...props.variables,
    shareMedium: props.medium.toUpperCase()
  }

  const res = useQuery(MessageLinkQuery, variables);

  function onClick() {
    window.open(res.data?.viewer?.messageLink ?? "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  } 

  return { ...props, onClick };
}
