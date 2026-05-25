import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalVerifyEmailView } from './PortalVerifyEmailView';
import { usePortalVerifyEmail } from './usePortalVerifyEmail';

export interface PortalVerifyEmailProps {
  verifyingText: string;
  successText: string;
  errorText: string;
  redirectUrl: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-verify-email': HTMLElement;
  }
}

export const PortalVerifyEmail = useComponent<PortalVerifyEmailProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalVerifyEmailProps = {
      verifyingText: rawProps.verifyingText || 'Verifying your email...',
      successText: rawProps.successText || 'Email verified! Redirecting...',
      errorText: rawProps.errorText || 'Verification failed. Please try again.',
      redirectUrl: rawProps.redirectUrl || '/',
    };

    const hookProps = usePortalVerifyEmail(props);

    return PortalVerifyEmailView({ ...props, ...hookProps });
  },
  'sql-portal-verify-email',
  ['verifying-text', 'success-text', 'error-text', 'redirect-url'] as const
);
