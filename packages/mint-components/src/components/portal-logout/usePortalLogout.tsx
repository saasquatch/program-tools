import {
  setPersistedUserIdentity,
  navigation,
} from "@saasquatch/component-boilerplate";

export function usePortalLogout({ logoutOnRender, nextPage }) {
  const logout = async () => {
    await setPersistedUserIdentity(undefined);
    navigation.push({ pathname: nextPage, search: "" });
  };

  if (logoutOnRender) {
    logout();
  }

  return {
    logout,
  };
}
