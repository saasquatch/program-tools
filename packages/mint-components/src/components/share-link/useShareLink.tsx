import { useQuery } from '@saasquatch/component-boilerplate';
import gql from 'graphql-tag';
import { ShareLinkViewProps } from './share-link-view';

interface ShareLinkProps extends ShareLinkViewProps {
  variables: {
    programId: string,
    engagemantMedium: string,
    shareMedium: string,
  }
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

// TODO make return types strict
// blocked by Logan's refactor
export function useShareLink(props: ShareLinkProps & any): ShareLinkViewProps & any {
  const res = useQuery(MessageLinkQuery, props.variables);
  console.log(res)
  return {...props, res};
}
