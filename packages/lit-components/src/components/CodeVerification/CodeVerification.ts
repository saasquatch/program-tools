import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { CodeVerificationView } from './CodeVerificationView';
import { useCodeVerification } from './useCodeVerification';

export interface CodeVerificationProps {
  headerText: string;
  descriptionText: string;
  codeLength: number;
  submitLabel: string;
  resendLabel: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-code-verification': HTMLElement;
  }
}

export const CodeVerification = useComponent<CodeVerificationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: CodeVerificationProps = {
      headerText: rawProps.headerText || 'Enter Verification Code',
      descriptionText: rawProps.descriptionText || 'Enter the code we sent to your email.',
      codeLength: Number(rawProps.codeLength) || 6,
      submitLabel: rawProps.submitLabel || 'Verify',
      resendLabel: rawProps.resendLabel || 'Resend Code',
    };

    const hookProps = useCodeVerification(props);

    return CodeVerificationView({ ...props, ...hookProps });
  },
  'sql-code-verification',
  ['header-text', 'description-text', 'code-length', 'submit-label', 'resend-label'] as const
);
