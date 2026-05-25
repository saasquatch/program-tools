import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalLogoutView } from './PortalLogoutView';
import { usePortalLogout } from './usePortalLogout';

export interface PortalLogoutProps {
  redirectUrl: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-logout': HTMLElement;
  }
}

export const PortalLogout = useComponent<PortalLogoutProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalLogoutProps = {
      redirectUrl: rawProps.redirectUrl || '/login',
    };

    usePortalLogout(props);

    return PortalLogoutView();
  },
  'sql-portal-logout',
  ['redirect-url'] as const
);
