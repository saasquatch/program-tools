import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalLoginView } from './PortalLoginView';
import { usePortalLogin } from './usePortalLogin';

export interface PortalLoginProps {
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  forgotPasswordLabel: string;
  registerLabel: string;
  headerText: string;
  errorMessage?: string;
  hideRegister: boolean;
  hideForgotPassword: boolean;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-login': HTMLElement;
  }
}

export const PortalLogin = useComponent<PortalLoginProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof PortalLoginProps, unknown>>;
    const props: PortalLoginProps = {
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      passwordLabel: typeof rawProps.passwordLabel === 'string' ? rawProps.passwordLabel : 'Password',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Sign In',
      forgotPasswordLabel:
        typeof rawProps.forgotPasswordLabel === 'string' ? rawProps.forgotPasswordLabel : 'Forgot Password?',
      registerLabel: typeof rawProps.registerLabel === 'string' ? rawProps.registerLabel : 'Register',
      headerText: typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Sign In',
      errorMessage: typeof rawProps.errorMessage === 'string' ? rawProps.errorMessage : undefined,
      hideRegister: parseBoolean(rawProps.hideRegister, false),
      hideForgotPassword: parseBoolean(rawProps.hideForgotPassword, false),
    };

    const hookProps = usePortalLogin(props);

    return PortalLoginView({ ...props, ...hookProps });
  },
  'sql-portal-login',
  [
    'email-label',
    'password-label',
    'submit-label',
    'forgot-password-label',
    'register-label',
    'header-text',
    'error-message',
    'hide-register',
    'hide-forgot-password',
  ] as const
);
