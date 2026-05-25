import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalProtectedRouteView } from './PortalProtectedRouteView';
import { usePortalProtectedRoute } from './usePortalProtectedRoute';

export interface PortalProtectedRouteProps {
  redirectUrl: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-protected-route': HTMLElement;
  }
}

export const PortalProtectedRoute = useComponent<PortalProtectedRouteProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalProtectedRouteProps = {
      redirectUrl: rawProps.redirectUrl || '/login',
    };

    const hookProps = usePortalProtectedRoute(props);

    return PortalProtectedRouteView({ ...props, ...hookProps });
  },
  'sql-portal-protected-route',
  ['redirect-url'] as const
);
