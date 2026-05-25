import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalEmailVerificationView } from './PortalEmailVerificationView';
import { usePortalEmailVerification } from './usePortalEmailVerification';

export interface PortalEmailVerificationProps {
  headerText: string;
  descriptionText: string;
  resendText: string;
  successText: string;
  redirectUrl?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-email-verification': HTMLElement;
  }
}

export const PortalEmailVerification = useComponent<PortalEmailVerificationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: PortalEmailVerificationProps = {
      headerText: rawProps.headerText || 'Verify Your Email',
      descriptionText:
        rawProps.descriptionText || "We've sent a verification link to your email.",
      resendText: rawProps.resendText || 'Resend verification email',
      successText: rawProps.successText || 'Email verified successfully!',
      redirectUrl: rawProps.redirectUrl || undefined,
    };

    const hookProps = usePortalEmailVerification(props);

    return PortalEmailVerificationView({ ...props, ...hookProps });
  },
  'sql-portal-email-verification',
  ['header-text', 'description-text', 'resend-text', 'success-text', 'redirect-url'] as const
);
