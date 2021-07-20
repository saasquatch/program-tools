import { useQuery, useUserIdentity } from "@saasquatch/component-boilerplate";
import gql from "graphql-tag";
import { UserName } from "./sqm-user-name";
import { UserNameViewProps } from "./sqm-user-name-view";

const GET_USER_NAME = gql`
  query getUserName {
    viewer {
      ... on User {
        firstName
        lastName
      }
    }
  }
`;

export function useUserName(props: UserName): UserNameViewProps {
  const user = useUserIdentity();
  const res = useQuery(GET_USER_NAME, {}, !user?.jwt);
  console.log(res);
  const loading = res.loading;
  const username =
    res.data?.viewer?.firstName || res.data?.viewer?.lastName
      ? `${res.data?.viewer?.firstName} ${res.data?.viewer?.lastName}`
      : props.fallback;
  return {
    loadingText: props.loadingText,
    loading,
    username,
  };
}
