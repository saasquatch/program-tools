import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { InstantAccessRegistrationView } from './InstantAccessRegistrationView';
import { useInstantAccessRegistration } from './useInstantAccessRegistration';

export interface InstantAccessRegistrationProps {
  headerText: string;
  submitLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  successMessage: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-instant-access-registration': HTMLElement;
  }
}

export const InstantAccessRegistration = useComponent<InstantAccessRegistrationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: InstantAccessRegistrationProps = {
      headerText: rawProps.headerText || 'Get Instant Access',
      submitLabel: rawProps.submitLabel || 'Get Started',
      emailLabel: rawProps.emailLabel || 'Email',
      emailPlaceholder: rawProps.emailPlaceholder || 'Enter your email',
      successMessage: rawProps.successMessage || 'Welcome! Check your email for next steps.',
      programId: rawProps.programId || undefined,
    };

    const hookProps = useInstantAccessRegistration(props);

    return InstantAccessRegistrationView({ ...props, ...hookProps });
  },
  'sql-instant-access-registration',
  [
    'header-text',
    'submit-label',
    'email-label',
    'email-placeholder',
    'success-message',
    'program-id',
  ] as const
);
