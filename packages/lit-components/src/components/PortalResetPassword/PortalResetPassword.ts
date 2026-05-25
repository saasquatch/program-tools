import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalResetPasswordView } from './PortalResetPasswordView';
import { usePortalResetPassword } from './usePortalResetPassword';

export interface PortalResetPasswordProps {
  passwordLabel: string;
  confirmPasswordLabel: string;
  submitLabel: string;
  headerText: string;
  successMessage: string;
  passwordMinLength: number;
}

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-reset-password': HTMLElement;
  }
}

export const PortalResetPassword = useComponent<PortalResetPasswordProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalResetPasswordProps, unknown>>;
    const props: PortalResetPasswordProps = {
      passwordLabel: typeof rawProps.passwordLabel === 'string' ? rawProps.passwordLabel : 'New Password',
      confirmPasswordLabel:
        typeof rawProps.confirmPasswordLabel === 'string' ? rawProps.confirmPasswordLabel : 'Confirm Password',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Reset Password',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Reset Password',
      successMessage:
        typeof rawProps.successMessage === 'string'
          ? rawProps.successMessage
          : 'Password reset successfully. You can now sign in.',
      passwordMinLength: parseNumber(rawProps.passwordMinLength, 8),
    };

    const hookProps = usePortalResetPassword(props);

    return PortalResetPasswordView({ ...props, ...hookProps });
  },
  'sql-portal-reset-password',
  [
    'password-label',
    'confirm-password-label',
    'submit-label',
    'header-text',
    'success-message',
    'password-min-length',
  ] as const
);
