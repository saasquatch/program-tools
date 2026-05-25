import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalChangePasswordView } from './PortalChangePasswordView';
import { usePortalChangePassword } from './usePortalChangePassword';

export interface PortalChangePasswordProps {
  currentPasswordLabel: string;
  newPasswordLabel: string;
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
    'sql-portal-change-password': HTMLElement;
  }
}

export const PortalChangePassword = useComponent<PortalChangePasswordProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalChangePasswordProps, unknown>>;
    const props: PortalChangePasswordProps = {
      currentPasswordLabel:
        typeof rawProps.currentPasswordLabel === 'string' ? rawProps.currentPasswordLabel : 'Current Password',
      newPasswordLabel: typeof rawProps.newPasswordLabel === 'string' ? rawProps.newPasswordLabel : 'New Password',
      confirmPasswordLabel:
        typeof rawProps.confirmPasswordLabel === 'string' ? rawProps.confirmPasswordLabel : 'Confirm New Password',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Change Password',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Change Password',
      successMessage:
        typeof rawProps.successMessage === 'string' ? rawProps.successMessage : 'Password changed successfully.',
      passwordMinLength: parseNumber(rawProps.passwordMinLength, 8),
    };

    const hookProps = usePortalChangePassword(props);

    return PortalChangePasswordView({ ...props, ...hookProps });
  },
  'sql-portal-change-password',
  [
    'current-password-label',
    'new-password-label',
    'confirm-password-label',
    'submit-label',
    'header-text',
    'success-message',
    'password-min-length',
  ] as const
);
