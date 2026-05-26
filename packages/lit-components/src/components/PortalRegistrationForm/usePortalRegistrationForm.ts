import { useState } from '@saasquatch/universal-hooks';
import type { PortalRegistrationFormProps } from './PortalRegistrationForm';

export function usePortalRegistrationForm(props: PortalRegistrationFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    if (props.showNameFields && (!firstName || !lastName)) {
      setError('Name fields are required');
      return;
    }
    if (props.showConfirmPassword && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < (Number(props.passwordMinLength) || 8)) {
      setError(`Password must be at least ${props.passwordMinLength || 8} characters`);
      return;
    }
    if (props.termsText && !termsAccepted) {
      setError('You must accept the terms');
      return;
    }

    setLoading(true);
    setError('');
    const event = new CustomEvent('sq:registration-submit', {
      bubbles: true,
      composed: true,
      detail: { firstName, lastName, email, password },
    });
    document.dispatchEvent(event);
    setLoading(false);
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    termsAccepted,
    setTermsAccepted,
    onSubmit,
  };
}

export function useDemoPortalRegistrationForm(
  props: PortalRegistrationFormProps
): ReturnType<typeof usePortalRegistrationForm> {
  const [firstName, setFirstName] = useState('Jane');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(Boolean(props.termsText));

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');
  }

  return {
    firstName: props.showNameFields ? firstName : '',
    setFirstName,
    lastName: props.showNameFields ? lastName : '',
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword: props.showConfirmPassword ? confirmPassword : '',
    setConfirmPassword,
    error,
    loading,
    termsAccepted,
    setTermsAccepted,
    onSubmit,
  };
}
