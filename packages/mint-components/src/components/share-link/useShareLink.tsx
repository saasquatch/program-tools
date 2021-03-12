import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps {
  icon?: string;
  iconlabel?: string;
  tooltiptext?: string;
  sharelink?: string;
  disabled?: boolean;
  variables?: {
    programId: string;
    engagementMedium: string;
    shareMedium: string;
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

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  const res = useQuery(MessageLinkQuery, props.variables);
  console.log(res);
  return { ...props, sharelink: res?.data?.viewer?.messageLink ?? '' };
}
