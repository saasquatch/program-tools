import {
  useUserIdentity,
  navigation,
  useCurrentPage,
} from "@saasquatch/component-boilerplate";
import { useEffect } from "haunted";

interface PortalProtectedRouteProps {
  redirectTo: string;
  requireEmailVerification: boolean;
  redirectToUnverified: string;
}

export function usePortalProtectedRoute({
  requireEmailVerification,
  redirectTo,
  redirectToUnverified,
}: PortalProtectedRouteProps) {
  const userIdent = useUserIdentity();

  const authenticated = !!userIdent?.jwt;
  const emailVerified = userIdent?.managedIdentity?.emailVerified;

  const { pathname, search } = useCurrentPage();
  const nextPageParam = new URLSearchParams();
  nextPageParam.append("nextPage", `${pathname}${search}`);

  useEffect(() => {
    if (!authenticated) {
      return navigation.push({
        pathname: redirectTo,
        search: "?" + nextPageParam.toString(),
      });
    }

    if (requireEmailVerification && !emailVerified) {
      return navigation.push({
        pathname: redirectToUnverified || redirectTo,
        search: "?" + nextPageParam.toString(),
      });
    }
  }, []);
}
