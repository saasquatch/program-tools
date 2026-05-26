import { useState } from '@saasquatch/universal-hooks';
import type { PortalGoogleRegistrationFormProps } from './PortalGoogleRegistrationForm';

export type RegistrationMode = 'base' | 'manual' | 'google';

interface GoogleCredentialResponse {
  credential?: string | null;
}

function decodeJwtPayload(credential?: string | null) {
  if (!credential) {
    return undefined;
  }

  const parts = credential.split('.');
  if (parts.length < 2) {
    return undefined;
  }

  try {
    const normalized = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padding = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
    const json = atob(normalized + padding);
    return JSON.parse(json) as {
      email?: string;
      given_name?: string;
      family_name?: string;
    };
  } catch {
    return undefined;
  }
}

function buildPasswordHelpText(props: PortalGoogleRegistrationFormProps, password: string) {
  if (props.disablePasswordValidation) {
    return '';
  }

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[^A-Za-z]/.test(password),
  ];

  return checks.every(Boolean)
    ? props.meetsRequirementsText
    : `${props.doesNotMeetRequirementsText} ${props.minErrorText}, ${props.uppercaseErrorText}, ${props.lowercaseErrorText}, ${props.hasErrorText}`;
}

function isPasswordValid(props: PortalGoogleRegistrationFormProps, password: string) {
  if (props.disablePasswordValidation) {
    return Boolean(password);
  }

  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[^A-Za-z]/.test(password)
  );
}

export interface PortalGoogleRegistrationFormHookResult {
  mode: RegistrationMode;
  baseEmail: string;
  setBaseEmail: (value: string) => void;
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPasswordValue: string;
  setConfirmPasswordValue: (value: string) => void;
  validationErrors: Record<string, string>;
  loading: boolean;
  error: string;
  passwordHelpText: string;
  onBaseSubmit: (event: Event) => Promise<void>;
  onGoogleInit: (event: Event) => void;
  onSubmit: (event: Event) => Promise<void>;
  onLogin: () => void;
}

export function usePortalGoogleRegistrationForm(
  props: PortalGoogleRegistrationFormProps
): PortalGoogleRegistrationFormHookResult {
  const [mode, setMode] = useState<RegistrationMode>('base');
  const [baseEmail, setBaseEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleCredential, setGoogleCredential] = useState<string | undefined>(undefined);

  const passwordHelpText = buildPasswordHelpText(props, password);

  async function onBaseSubmit(event: Event) {
    event.preventDefault();

    if (!baseEmail) {
      setValidationErrors({ email: props.requiredFieldErrorMessage });
      return;
    }

    if (!baseEmail.includes('@')) {
      setValidationErrors({ email: props.invalidEmailErrorMessage });
      return;
    }

    setValidationErrors({});
    setEmail(baseEmail);
    setError('');
    setMode('manual');
  }

  function onGoogleInit(event: Event) {
    const detail = (event as CustomEvent<GoogleCredentialResponse>).detail;
    const credential = detail?.credential ?? undefined;
    const payload = decodeJwtPayload(credential);

    setGoogleCredential(credential || undefined);
    setBaseEmail(payload?.email || baseEmail);
    setEmail(payload?.email || baseEmail);
    setFirstName(payload?.given_name || '');
    setLastName(payload?.family_name || '');
    setValidationErrors({});
    setError('');
    setMode('google');
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');

    if (showRequiredFieldError()) {
      return;
    }

    if (mode !== 'google') {
      if (props.confirmPassword && password !== confirmPasswordValue) {
        setError(props.passwordMismatchErrorMessage);
        return;
      }

      if (!isPasswordValid(props, password)) {
        setError(passwordHelpText || props.networkErrorMessage);
        return;
      }
    }

    setLoading(true);
    document.dispatchEvent(
      new CustomEvent('sq:portal-google-registration-submit', {
        bubbles: true,
        composed: true,
        detail: {
          mode,
          formKey: props.formKey,
          nextPage: props.nextPage,
          redirectPath: props.redirectPath,
          email,
          firstName,
          lastName,
          password: mode === 'google' ? undefined : password,
          googleCredential,
        },
      })
    );
    setLoading(false);
  }

  function showRequiredFieldError() {
    if (!props.hideInputs) {
      if (!email) {
        setError(props.requiredFieldErrorMessage);
        return true;
      }

      if (!email.includes('@')) {
        setError(props.invalidEmailErrorMessage);
        return true;
      }
    }

    if (mode !== 'google' && !password) {
      setError(props.requiredFieldErrorMessage);
      return true;
    }

    return false;
  }

  function onLogin() {
    document.dispatchEvent(
      new CustomEvent('sq:navigate', {
        bubbles: true,
        composed: true,
        detail: { path: props.loginPath },
      })
    );
  }

  return {
    mode,
    baseEmail,
    setBaseEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPasswordValue,
    setConfirmPasswordValue,
    validationErrors,
    loading,
    error,
    passwordHelpText,
    onBaseSubmit,
    onGoogleInit,
    onSubmit,
    onLogin,
  };
}

export function useDemoPortalGoogleRegistrationForm(
  props: PortalGoogleRegistrationFormProps
): PortalGoogleRegistrationFormHookResult {
  const [mode, setMode] = useState<RegistrationMode>('manual');
  const [baseEmail, setBaseEmail] = useState('jane@example.com');
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('Password123!');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('Password123!');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading] = useState(false);

  const passwordHelpText = buildPasswordHelpText(props, password);

  async function onBaseSubmit(event: Event) {
    event.preventDefault();
    setValidationErrors({});
    setEmail(baseEmail);
    setError('');
    setMode('manual');
  }

  function onGoogleInit(_event: Event) {
    setValidationErrors({});
    setError('');
    setMode('google');
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    setValidationErrors({});
    setError('');
  }

  function onLogin() {
    setError('');
  }

  return {
    mode,
    baseEmail,
    setBaseEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPasswordValue: props.confirmPassword ? confirmPasswordValue : '',
    setConfirmPasswordValue,
    validationErrors,
    loading,
    error,
    passwordHelpText,
    onBaseSubmit,
    onGoogleInit,
    onSubmit,
    onLogin,
  };
}
