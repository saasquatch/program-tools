import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalGoogleLoginView } from './PortalGoogleLoginView';

export interface PortalGoogleLoginProps {
  buttonText: string;
  clientId?: string;
  size: 'small' | 'medium' | 'large';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-google-login': HTMLElement;
  }
}

export const PortalGoogleLogin = useComponent<PortalGoogleLoginProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalGoogleLoginProps = {
      buttonText: rawProps.buttonText || 'Sign in with Google',
      clientId: rawProps.clientId || undefined,
      size:
        rawProps.size === 'small' || rawProps.size === 'large'
          ? rawProps.size
          : 'medium',
    };

    return PortalGoogleLoginView(props);
  },
  'sql-portal-google-login',
  ['button-text', 'client-id', 'size'] as const
);
