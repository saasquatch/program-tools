import { setUserIdentity, navigation } from "@saasquatch/component-boilerplate";

export function usePortalLogout({ logoutOnRender, nextPage }) {
  const logout = () => {
    setUserIdentity(undefined);
    navigation.push({ pathname: nextPage, search: "" });
  };

  if (logoutOnRender) {
    logout();
  }

  return {
    logout,
  };
}
