import {
  setUserIdentity,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { LogoutCurrentUser } from "./sqm-logout-current-user";
import { LogoutCurrentUserViewProps } from "./sqm-logout-current-user-view";
import { gql } from "graphql-request";

type GetUserDetails = {
  viewer: {
    id: string;
    accountId: string;
    email?: string;
  };
};

const GET_USER_DETAILS = gql`
  query getUserDetails {
    viewer {
      ... on User {
        id
        accountId
        email
      }
    }
  }
`;

export function useLogoutCurrentUser(
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  const user = useUserIdentity();

  const { loading, data } = useQuery<GetUserDetails>(
    GET_USER_DETAILS,
    {},
    !user
  );

  const onSwitchClick = () => {
    setUserIdentity(undefined);
  };

  const filledInEmailText = props.userIdentificationText?.replace(
    "{email}",
    data?.viewer?.email
  );

  return {
    loading,
    onSwitchClick,
    filledInEmailText,
    ...props,
  };
}
