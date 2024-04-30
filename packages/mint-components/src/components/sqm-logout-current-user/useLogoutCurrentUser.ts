import {
  setUserIdentity,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { LogoutCurrentUser } from "./sqm-logout-current-user";
import { LogoutCurrentUserViewProps } from "./sqm-logout-current-user-view";
import { gql } from "graphql-request";

type GetUserDetails = {
  user: {
    id: string;
    accountId: string;
    email?: string;
  };
};

const GET_USER_DETAILS = gql`
  query getUserDetails($id: String!, $accountId: String!) {
    user(id: $id, accountId: $accountId) {
      id
      accountId
      email
    }
  }
`;

export function useLogoutCurrentUser(
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  const user = useUserIdentity();

  const { loading, data } = useQuery<GetUserDetails>(
    GET_USER_DETAILS,
    {
      id: user?.id,
      accountId: user?.accountId,
    },
    !user
  );

  const onSwitchClick = () => {
    setUserIdentity(undefined);
  };

  const filledInEmailText = props.userIdentificationText?.replace(
    "{email}",
    data?.user?.email
  );

  return {
    loading,
    onSwitchClick,
    filledInEmailText,
    ...props,
  };
}
