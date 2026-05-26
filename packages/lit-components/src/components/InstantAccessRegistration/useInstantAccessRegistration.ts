import { useProgramId } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import type { InstantAccessRegistrationProps } from './InstantAccessRegistration';

export function useInstantAccessRegistration(props: InstantAccessRegistrationProps) {
  const programId = useProgramId() || props.programId;
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    setLoading(true);
    setError('');
    const event = new CustomEvent('sq:instant-access', {
      bubbles: true,
      composed: true,
      detail: { email, programId },
    });
    document.dispatchEvent(event);
    setSuccess(true);
    setLoading(false);
  }

  return { email, setEmail, error, loading, success, onSubmit };
}

export function useDemoInstantAccessRegistration(
  _props: InstantAccessRegistrationProps
): ReturnType<typeof useInstantAccessRegistration> {
  const [email, setEmail] = useState('jane@example.com');
  const [error, setError] = useState('');
  const [loading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');
    setSuccess(true);
  }

  return { email, setEmail, error, loading, success, onSubmit };
}
