import { useState } from '@saasquatch/universal-hooks';
import { PortalForgotPasswordProps } from './PortalForgotPassword';

export function usePortalForgotPassword(props: PortalForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  void props;

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setLoading(true);
    setError('');
    document.dispatchEvent(
      new CustomEvent('sq:forgot-password', {
        bubbles: true,
        composed: true,
        detail: { email },
      })
    );
    setSuccess(true);
    setLoading(false);
  }

  function onBack() {
    document.dispatchEvent(
      new CustomEvent('sq:navigate', {
        bubbles: true,
        composed: true,
        detail: { path: '/login' },
      })
    );
  }

  return { email, setEmail, error, loading, success, onSubmit, onBack };
}
