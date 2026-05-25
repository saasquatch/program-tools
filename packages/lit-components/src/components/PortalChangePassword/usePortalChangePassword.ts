import { useState } from '@saasquatch/universal-hooks';
import { PortalChangePasswordProps } from './PortalChangePassword';

export function usePortalChangePassword(props: PortalChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setError('');
    setSuccess(false);
  }

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!currentPassword || !newPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < (Number(props.passwordMinLength) || 8)) {
      setError(`Password must be at least ${props.passwordMinLength || 8} characters`);
      return;
    }
    setLoading(true);
    setError('');
    document.dispatchEvent(
      new CustomEvent('sq:change-password', {
        bubbles: true,
        composed: true,
        detail: { currentPassword, newPassword },
      })
    );
    setSuccess(true);
    setLoading(false);
  }

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    success,
    isOpen,
    open,
    close,
    onSubmit,
  };
}
