import { useState } from '@saasquatch/universal-hooks';
import { PortalRegisterProps } from './PortalRegister';

export function usePortalRegister(props: PortalRegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
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
    setLoading(true);
    setError('');
    document.dispatchEvent(
      new CustomEvent('sq:register', {
        bubbles: true,
        composed: true,
        detail: { email, password },
      })
    );
    setLoading(false);
  }

  function onLogin() {
    document.dispatchEvent(
      new CustomEvent('sq:navigate', {
        bubbles: true,
        composed: true,
        detail: { path: '/login' },
      })
    );
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    onSubmit,
    onLogin,
  };
}

export function useDemoPortalRegister(props: PortalRegisterProps): ReturnType<typeof usePortalRegister> {
  const [email, setEmail] = useState('jane@example.com');
  const [password, setPassword] = useState('Password123!');
  const [confirmPassword, setConfirmPassword] = useState('Password123!');
  const [error, setError] = useState('');
  const [loading] = useState(false);

  async function onSubmit(event: Event) {
    event.preventDefault();
    setError('');
  }

  function onLogin() {
    setError('');
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword: props.showConfirmPassword ? confirmPassword : '',
    setConfirmPassword,
    error,
    loading,
    onSubmit,
    onLogin,
  };
}
