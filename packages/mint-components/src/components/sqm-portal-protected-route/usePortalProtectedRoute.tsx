import { useUserIdentity, navigation } from "@saasquatch/component-boilerplate";
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
  const urlPath = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  const nextPageParam = new URLSearchParams();
  nextPageParam.append("nextPage", `${urlPath}?${searchParams.toString()}`);

  const search = "?" + nextPageParam.toString();

  // console.log("-------");
  // console.log(window.location);
  // console.log(search);
  // console.log("-------");
  useEffect(() => {
    if (!authenticated) {
      return navigation.push({
        pathname: redirectTo,
        search,
      });
    }

    if (requireEmailVerification && !emailVerified) {
      return navigation.push({
        pathname: redirectToUnverified || redirectTo,
        search,
      });
    }
  }, []);
}
