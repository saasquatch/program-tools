import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { GoogleSignInView } from './GoogleSignInView';
import { useGoogleSignIn } from './useGoogleSignIn';

export interface GoogleSignInProps {
  text: string;
  clientId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-google-sign-in': HTMLElement;
  }
}

export const GoogleSignIn = useComponent<GoogleSignInProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: GoogleSignInProps = {
      text: rawProps.text || 'signup_with',
      clientId: rawProps.clientId || undefined,
    };

    const hookProps = useGoogleSignIn(host, props);

    return GoogleSignInView({ ...props, ...hookProps });
  },
  'sql-google-sign-in',
  ['text', 'client-id'] as const
);
