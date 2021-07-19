import { setUserIdentity, navigation } from "@saasquatch/component-boilerplate";

export function usePortalLogout({ nextPage }) {
  setUserIdentity(undefined);
  navigation.push({ pathname: nextPage, search: "" });
}
