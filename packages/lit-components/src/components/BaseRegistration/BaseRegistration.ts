import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { BaseRegistrationView } from './BaseRegistrationView';
import { useBaseRegistration } from './useBaseRegistration';

export interface BaseRegistrationProps {
  pageLabel: string;
  emailLabel: string;
  submitLabel: string;
  requiredFieldErrorMessage: string;
  invalidEmailErrorMessage: string;
  showGoogleButton: boolean;
  showSecondaryButton: boolean;
}

const parseBoolean = (value: unknown, fallback: boolean) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === '' || value === 'true';
  return fallback;
};

declare global {
  interface HTMLElementTagNameMap {
    'sql-base-registration': HTMLElement;
  }
}

export const BaseRegistration = useComponent<BaseRegistrationProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof BaseRegistrationProps, unknown>>;
    const props: BaseRegistrationProps = {
      pageLabel: typeof rawProps.pageLabel === 'string' ? rawProps.pageLabel : 'Register',
      emailLabel: typeof rawProps.emailLabel === 'string' ? rawProps.emailLabel : 'Email',
      submitLabel: typeof rawProps.submitLabel === 'string' ? rawProps.submitLabel : 'Register',
      requiredFieldErrorMessage:
        typeof rawProps.requiredFieldErrorMessage === 'string'
          ? rawProps.requiredFieldErrorMessage
          : 'Cannot be empty',
      invalidEmailErrorMessage:
        typeof rawProps.invalidEmailErrorMessage === 'string'
          ? rawProps.invalidEmailErrorMessage
          : 'Must be a valid email address',
      showGoogleButton: parseBoolean(rawProps.showGoogleButton, true),
      showSecondaryButton: parseBoolean(rawProps.showSecondaryButton, true),
    };

    const hookProps = useBaseRegistration(props);

    return BaseRegistrationView({
      ...props,
      ...hookProps,
      formData: host.querySelector('[slot="formData"]') ? undefined : undefined,
      googleButton: props.showGoogleButton ? undefined : undefined,
      secondaryButton: props.showSecondaryButton ? undefined : undefined,
      terms: undefined,
    });
  },
  'sql-base-registration',
  [
    'page-label',
    'email-label',
    'submit-label',
    'required-field-error-message',
    'invalid-email-error-message',
    'show-google-button',
    'show-secondary-button',
  ] as const
);
