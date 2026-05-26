import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalRegisterView } from './PortalRegisterView';
import { useDemoPortalRegister, usePortalRegister } from './usePortalRegister';

export interface PortalRegisterProps {
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  submitLabel: string;
  loginLabel: string;
  headerText: string;
  showConfirmPassword: boolean;
  passwordMinLength: number;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

const parseNumber = (value: unknown, fallback: number) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() !== '') return Number(value);
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-register': HTMLElement;
  }
}

export const PortalRegister = useComponent<PortalRegisterProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalRegisterProps, unknown>>;
    const props: PortalRegisterProps = {
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      passwordLabel: typeof rawProps.passwordLabel === 'string' ? rawProps.passwordLabel : 'Password',
      confirmPasswordLabel:
        typeof rawProps.confirmPasswordLabel === 'string' ? rawProps.confirmPasswordLabel : 'Confirm Password',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Register',
      loginLabel:
        typeof rawProps.loginLabel === 'string' ? rawProps.loginLabel : 'Already have an account? Sign in',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Create Account',
      showConfirmPassword: parseBoolean(rawProps.showConfirmPassword, true),
      passwordMinLength: parseNumber(rawProps.passwordMinLength, 8),
    };

    const hookProps = isDemo() ? useDemoPortalRegister(props) : usePortalRegister(props);

    return PortalRegisterView({ ...props, ...hookProps });
  },
  'sql-portal-register',
  [
    'email-label',
    'password-label',
    'confirm-password-label',
    'submit-label',
    'login-label',
    'header-text',
    'show-confirm-password',
    'password-min-length',
  ] as const
);
