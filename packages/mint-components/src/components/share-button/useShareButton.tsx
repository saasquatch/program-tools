import { useQuery, useEngagementMedium, useProgramId } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareButtonViewProps } from './share-button-view';

interface ShareButtonProps extends ShareButtonViewProps {
  programId?: string
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
    engagementMedium: useEngagementMedium(),
    programId: props.programId,
    shareMedium: props.medium.toUpperCase(),
  };

  const res = useQuery(MessageLinkQuery, variables);

  function onClick() {
    window.open(res.data?.viewer?.messageLink ?? 'https://example.com');
  }

  return { ...props, onClick };
}
