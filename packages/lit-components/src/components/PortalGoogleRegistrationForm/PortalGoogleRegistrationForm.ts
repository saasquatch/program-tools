import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalGoogleRegistrationFormView } from './PortalGoogleRegistrationFormView';
import {
  type PortalGoogleRegistrationFormHookResult,
  usePortalGoogleRegistrationForm,
} from './usePortalGoogleRegistrationForm';

export interface PortalGoogleRegistrationFormProps {
  nextPage: string;
  redirectPath: string;
  emailLabel: string;
  passwordLabel: string;
  submitLabel: string;
  loginLabel: string;
  confirmPasswordLabel: string;
  confirmPassword: boolean;
  disablePasswordValidation: boolean;
  hideInputs: boolean;
  pageLabel: string;
  loginPath: string;
  loginCTA: string;
  requiredFieldErrorMessage: string;
  networkErrorMessage: string;
  passwordMismatchErrorMessage: string;
  invalidEmailErrorMessage: string;
  formDisabledErrorMessage: string;
  meetsRequirementsText: string;
  doesNotMeetRequirementsText: string;
  minErrorText: string;
  uppercaseErrorText: string;
  lowercaseErrorText: string;
  hasErrorText: string;
  formKey?: string;
  googleButtonText: string;
}

const parseBoolean = (value: unknown, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-google-registration-form': HTMLElement;
  }
}

function getDefaultProps(
  rawProps: Partial<Record<keyof PortalGoogleRegistrationFormProps, unknown>>
): PortalGoogleRegistrationFormProps {
  return {
    nextPage: typeof rawProps.nextPage === 'string' ? rawProps.nextPage : '/',
    redirectPath:
      typeof rawProps.redirectPath === 'string' ? rawProps.redirectPath : '/verifyEmail',
    emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
    passwordLabel:
      typeof rawProps.passwordLabel === 'string' ? rawProps.passwordLabel : 'Password',
    submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Register',
    loginLabel: typeof rawProps.loginLabel === 'string' ? rawProps.loginLabel : 'Sign in',
    confirmPasswordLabel:
      typeof rawProps.confirmPasswordLabel === 'string'
        ? rawProps.confirmPasswordLabel
        : 'Confirm Password',
    confirmPassword: parseBoolean(rawProps.confirmPassword, false),
    disablePasswordValidation: parseBoolean(rawProps.disablePasswordValidation, false),
    hideInputs: parseBoolean(rawProps.hideInputs, false),
    pageLabel: typeof rawProps.pageLabel === 'string' ? rawProps.pageLabel : 'Register',
    loginPath: typeof rawProps.loginPath === 'string' ? rawProps.loginPath : '/login',
    loginCTA:
      typeof rawProps.loginCTA === 'string'
        ? rawProps.loginCTA
        : 'Already have an account?',
    requiredFieldErrorMessage:
      typeof rawProps.requiredFieldErrorMessage === 'string'
        ? rawProps.requiredFieldErrorMessage
        : 'Cannot be empty',
    networkErrorMessage:
      typeof rawProps.networkErrorMessage === 'string'
        ? rawProps.networkErrorMessage
        : 'Network request failed.',
    passwordMismatchErrorMessage:
      typeof rawProps.passwordMismatchErrorMessage === 'string'
        ? rawProps.passwordMismatchErrorMessage
        : 'Passwords do not match.',
    invalidEmailErrorMessage:
      typeof rawProps.invalidEmailErrorMessage === 'string'
        ? rawProps.invalidEmailErrorMessage
        : 'Must be a valid email address',
    formDisabledErrorMessage:
      typeof rawProps.formDisabledErrorMessage === 'string'
        ? rawProps.formDisabledErrorMessage
        : 'The registration form is currently disabled.',
    meetsRequirementsText:
      typeof rawProps.meetsRequirementsText === 'string'
        ? rawProps.meetsRequirementsText
        : 'Password has met all requirements',
    doesNotMeetRequirementsText:
      typeof rawProps.doesNotMeetRequirementsText === 'string'
        ? rawProps.doesNotMeetRequirementsText
        : 'Password must meet the following requirements:',
    minErrorText:
      typeof rawProps.minErrorText === 'string'
        ? rawProps.minErrorText
        : 'be a minimum of 8 characters',
    uppercaseErrorText:
      typeof rawProps.uppercaseErrorText === 'string'
        ? rawProps.uppercaseErrorText
        : 'contain at least 1 uppercase character',
    lowercaseErrorText:
      typeof rawProps.lowercaseErrorText === 'string'
        ? rawProps.lowercaseErrorText
        : 'contain at least 1 lowercase character',
    hasErrorText:
      typeof rawProps.hasErrorText === 'string'
        ? rawProps.hasErrorText
        : 'contain at least 1 number or symbol',
    formKey: typeof rawProps.formKey === 'string' ? rawProps.formKey : undefined,
    googleButtonText:
      typeof rawProps.googleButtonText === 'string'
        ? rawProps.googleButtonText
        : 'signup_with',
  };
}

export const PortalGoogleRegistrationForm = useComponent<PortalGoogleRegistrationFormProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<
      Record<keyof PortalGoogleRegistrationFormProps, unknown>
    >;
    const props = getDefaultProps(rawProps);
    const hookProps = usePortalGoogleRegistrationForm(props) as PortalGoogleRegistrationFormHookResult;

    return PortalGoogleRegistrationFormView({ ...props, ...hookProps });
  },
  'sql-portal-google-registration-form',
  [
    'next-page',
    'redirect-path',
    'email-label',
    'password-label',
    'submit-label',
    'login-label',
    'confirm-password-label',
    'confirm-password',
    'disable-password-validation',
    'hide-inputs',
    'page-label',
    'login-path',
    'login-cta',
    'required-field-error-message',
    'network-error-message',
    'password-mismatch-error-message',
    'invalid-email-error-message',
    'form-disabled-error-message',
    'meets-requirements-text',
    'does-not-meet-requirements-text',
    'min-error-text',
    'uppercase-error-text',
    'lowercase-error-text',
    'has-error-text',
    'form-key',
    'google-button-text',
  ] as const
);
