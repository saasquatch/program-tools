import { useState } from '@saasquatch/universal-hooks';
import type { EmailVerificationProps } from './EmailVerification';

export function useEmailVerification(_props: EmailVerificationProps) {
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  function onResend() {
    setLoading(true);
    const event = new CustomEvent('sq:email-resend', { bubbles: true, composed: true });
    document.dispatchEvent(event);
    setResent(true);
    setLoading(false);
  }

  return { resent, loading, onResend };
}
