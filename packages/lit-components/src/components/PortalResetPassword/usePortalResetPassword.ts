import { useState } from '@saasquatch/universal-hooks';
import { PortalResetPasswordProps } from './PortalResetPassword';

export function usePortalResetPassword(props: PortalResetPasswordProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const search = typeof window === 'undefined' ? '' : window.location.search;
  const urlParams = new URLSearchParams(search);
  const resetCode = urlParams.get('oobCode') || urlParams.get('code') || '';

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!resetCode) {
      setError('Invalid or expired reset link');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < (Number(props.passwordMinLength) || 8)) {
      setError(`Password must be at least ${props.passwordMinLength || 8} characters`);
      return;
    }
    setLoading(true);
    setError('');
    document.dispatchEvent(
      new CustomEvent('sq:reset-password', {
        bubbles: true,
        composed: true,
        detail: { password, resetCode },
      })
    );
    setSuccess(true);
    setLoading(false);
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    success,
    resetCode,
    onSubmit,
  };
}

export function useDemoPortalResetPassword(props: PortalResetPasswordProps): ReturnType<typeof usePortalResetPassword> {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const resetCode = 'demo-reset-code';

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!password) {
      setError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < (Number(props.passwordMinLength) || 8)) {
      setError(`Password must be at least ${props.passwordMinLength || 8} characters`);
      return;
    }
    setLoading(true);
    setError('');
    setSuccess(true);
    setLoading(false);
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    success,
    resetCode,
    onSubmit,
  };
}
