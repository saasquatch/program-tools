import { useUserIdentity } from '@saasquatch/component-boilerplate';
import type { PortalProtectedRouteProps } from './PortalProtectedRoute';

export function usePortalProtectedRoute(props: PortalProtectedRouteProps) {
  const user = useUserIdentity();
  const isAuthenticated = !!user?.jwt;

  if (!isAuthenticated && props.redirectUrl) {
    window.location.hash = props.redirectUrl;
  }

  return { isAuthenticated };
}
