import { useState } from '@saasquatch/universal-hooks';
import type { CodeVerificationProps } from './CodeVerification';

export function useCodeVerification(props: CodeVerificationProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);

  function onSubmit(e: Event) {
    e.preventDefault();
    const codeLength = Number(props.codeLength) || 6;
    if (code.length !== codeLength) {
      setError(`Code must be ${codeLength} digits`);
      return;
    }
    setLoading(true);
    setError('');
    const event = new CustomEvent('sq:code-verify', {
      bubbles: true,
      composed: true,
      detail: { code },
    });
    document.dispatchEvent(event);
    setLoading(false);
  }

  function onResend() {
    const event = new CustomEvent('sq:code-resend', { bubbles: true, composed: true });
    document.dispatchEvent(event);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return { code, setCode, error, loading, resent, onSubmit, onResend };
}
