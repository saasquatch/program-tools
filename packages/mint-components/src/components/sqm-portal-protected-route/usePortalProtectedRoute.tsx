import {
  usePersistedUserIdentity,
  navigation,
} from "@saasquatch/component-boilerplate";

export async function usePortalProtectedRoute({
  authenticated,
  verified,
  redirectTo,
  redirectToUnverified,
}) {
  const userIdent = await usePersistedUserIdentity();

  if (authenticated || verified) {
    if (!userIdent?.jwt) return navigation.push(redirectTo);
  }

  if (verified) {
    if (!userIdent?.sessionData?.verified) {
      return navigation.push(redirectToUnverified || redirectTo);
    }
  }
}
