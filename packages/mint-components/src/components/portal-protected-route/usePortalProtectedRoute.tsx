import { useUserIdentity, navigation } from "@saasquatch/component-boilerplate";

interface PortalProtectedRouteProps {
  redirectTo: string;
  requireEmailVerification?: boolean;
  redirectToUnverified?: string;
}

export function usePortalProtectedRoute({
  requireEmailVerification,
  redirectTo,
  redirectToUnverified,
}: PortalProtectedRouteProps) {
  const userIdent = useUserIdentity();

  const authenticated = !!userIdent?.jwt;
  const emailVerified = userIdent?.managedIdentity?.emailVerified;

  if (!authenticated) {
    return navigation.push(redirectTo);
  }

  if (requireEmailVerification && !emailVerified) {
    return navigation.push(redirectToUnverified || redirectTo);
  }
}
