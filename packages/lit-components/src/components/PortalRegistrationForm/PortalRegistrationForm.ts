import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { PortalRegistrationFormView } from './PortalRegistrationFormView';
import { usePortalRegistrationForm } from './usePortalRegistrationForm';

export interface PortalRegistrationFormProps {
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  firstNameLabel: string;
  lastNameLabel: string;
  submitLabel: string;
  showNameFields: boolean;
  showConfirmPassword: boolean;
  passwordMinLength: number;
  headerText: string;
  termsText?: string;
  termsUrl?: string;
}

function getBooleanAttribute(host: HTMLElement, name: string, defaultValue = false) {
  if (!host.hasAttribute(name)) {
    return defaultValue;
  }

  const value = host.getAttribute(name);
  return value === '' || value === 'true';
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-portal-registration-form': HTMLElement;
  }
}

export const PortalRegistrationForm = useComponent<PortalRegistrationFormProps>(
  (host) => {
    const rawProps = getProps(host);
    const passwordMinLength = Number(rawProps.passwordMinLength);
    const props: PortalRegistrationFormProps = {
      emailLabel: rawProps.emailLabel || 'Email',
      passwordLabel: rawProps.passwordLabel || 'Password',
      confirmPasswordLabel: rawProps.confirmPasswordLabel || 'Confirm Password',
      firstNameLabel: rawProps.firstNameLabel || 'First Name',
      lastNameLabel: rawProps.lastNameLabel || 'Last Name',
      submitLabel: rawProps.submitLabel || 'Register',
      showNameFields: getBooleanAttribute(host, 'show-name-fields', true),
      showConfirmPassword: getBooleanAttribute(host, 'show-confirm-password', true),
      passwordMinLength: Number.isFinite(passwordMinLength) ? passwordMinLength : 8,
      headerText: rawProps.headerText || 'Create Your Account',
      termsText: rawProps.termsText || undefined,
      termsUrl: rawProps.termsUrl || undefined,
    };

    const hookProps = usePortalRegistrationForm(props);

    return PortalRegistrationFormView({ ...props, ...hookProps });
  },
  'sql-portal-registration-form',
  [
    'email-label',
    'password-label',
    'confirm-password-label',
    'first-name-label',
    'last-name-label',
    'submit-label',
    'show-name-fields',
    'show-confirm-password',
    'password-min-length',
    'header-text',
    'terms-text',
    'terms-url',
  ] as const
);
