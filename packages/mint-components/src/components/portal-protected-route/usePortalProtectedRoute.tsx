import { useUserIdentity, navigation } from "@saasquatch/component-boilerplate";

export function usePortalProtectedRoute({
  authenticated,
  verified,
  redirectTo,
  redirectToUnverified,
}) {
  const userIdent = useUserIdentity();

  if (authenticated || verified) {
    if (!userIdent?.jwt) return navigation.push(redirectTo);
  }

  if (verified) {
    if (!userIdent?.sessionData?.verified) {
      return navigation.push(redirectToUnverified || redirectTo);
    }
  }
}
