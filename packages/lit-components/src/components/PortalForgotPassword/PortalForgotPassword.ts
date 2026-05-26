import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalForgotPasswordView } from './PortalForgotPasswordView';
import { useDemoPortalForgotPassword, usePortalForgotPassword } from './usePortalForgotPassword';

export interface PortalForgotPasswordProps {
  emailLabel: string;
  submitLabel: string;
  backLabel: string;
  headerText: string;
  descriptionText: string;
  successMessage: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-forgot-password': HTMLElement;
  }
}

export const PortalForgotPassword = useComponent<PortalForgotPasswordProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalForgotPasswordProps, unknown>>;
    const props: PortalForgotPasswordProps = {
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Send Reset Link',
      backLabel: typeof rawProps.backLabel === 'string' ? rawProps.backLabel : 'Back to Login',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Forgot Password',
      descriptionText:
        typeof rawProps.descriptionText === 'string'
          ? rawProps.descriptionText
          : "Enter your email and we'll send you a reset link.",
      successMessage:
        typeof rawProps.successMessage === 'string'
          ? rawProps.successMessage
          : 'Check your email for a reset link.',
    };

    const hookProps = isDemo() ? useDemoPortalForgotPassword(props) : usePortalForgotPassword(props);

    return PortalForgotPasswordView({ ...props, ...hookProps });
  },
  'sql-portal-forgot-password',
  ['email-label', 'submit-label', 'back-label', 'header-text', 'description-text', 'success-message'] as const
);
