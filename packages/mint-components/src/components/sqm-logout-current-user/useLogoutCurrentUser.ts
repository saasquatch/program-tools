import { setUserIdentity } from "@saasquatch/component-boilerplate";
import { LogoutCurrentUser } from "./sqm-logout-current-user";
import { LogoutCurrentUserViewProps } from "./sqm-logout-current-user-view";

export function useLogoutCurrentUser(
  // @ts-ignore;
  props: LogoutCurrentUser
): LogoutCurrentUserViewProps {
  const onSwitchClick = () => {
    setUserIdentity(undefined);
  };

  return {
    onSwitchClick,
    userIdentificationText: "",
    switchUserText: "",
  };
}
