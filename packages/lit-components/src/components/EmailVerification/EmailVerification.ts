import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { EmailVerificationView } from './EmailVerificationView';
import { useEmailVerification } from './useEmailVerification';

export interface EmailVerificationProps {
  headerText: string;
  descriptionText: string;
  resendLabel: string;
  successText: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-email-verification': HTMLElement;
  }
}

export const EmailVerification = useComponent<EmailVerificationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: EmailVerificationProps = {
      headerText: rawProps.headerText || 'Check Your Email',
      descriptionText:
        rawProps.descriptionText ||
        "We've sent a verification email. Click the link to verify.",
      resendLabel: rawProps.resendLabel || 'Resend Email',
      successText: rawProps.successText || 'Verified!',
    };

    const hookProps = useEmailVerification(props);

    return EmailVerificationView({ ...props, ...hookProps });
  },
  'sql-email-verification',
  ['header-text', 'description-text', 'resend-label', 'success-text'] as const
);
