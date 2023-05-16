import {
  setUserIdentity,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { LogoutCurrentUser } from "./sqm-logout-current-user";
import { LogoutCurrentUserViewProps } from "./sqm-logout-current-user-view";

export function useLogoutCurrentUser(
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  const user = useUserIdentity();

  const onSwitchClick = () => {
    setUserIdentity(undefined);
  };

  const filledInEmailText = props.userIdentificationText?.replace(
    "{email}",
    user?.id || "Error fetching email"
  );

  return {
    onSwitchClick,
    filledInEmailText,
    ...props,
  };
}
