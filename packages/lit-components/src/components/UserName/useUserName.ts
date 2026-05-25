import { useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { UserNameProps } from './UserName';

const USER_NAME_QUERY = gql`
  query getUserName {
    viewer {
      ... on User {
        firstName
        lastName
      }
    }
  }
`;

export function useUserName(props: UserNameProps) {
  const user = useUserIdentity();
  const { data, loading } = useQuery(USER_NAME_QUERY, {}, !user?.jwt);

  const firstName = data?.viewer?.firstName || '';
  const lastName = data?.viewer?.lastName || '';
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || props.fallbackText;

  return { displayName, loading };
}
