import { useState } from '@saasquatch/universal-hooks';
import type { PortalEmailVerificationProps } from './PortalEmailVerification';

export function usePortalEmailVerification(_props: PortalEmailVerificationProps) {
  const [verified] = useState(false);
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('oobCode') || urlParams.get('token') || '';

  async function onResend() {
    setLoading(true);
    const event = new CustomEvent('sq:resend-verification', {
      bubbles: true,
      composed: true,
    });
    document.dispatchEvent(event);
    setResent(true);
    setLoading(false);
  }

  return { verified, token, resent, loading, onResend };
}

export function useDemoPortalEmailVerification(
  _props: PortalEmailVerificationProps
): ReturnType<typeof usePortalEmailVerification> {
  const [verified] = useState(false);
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onResend() {
    setLoading(true);
    setResent(true);
    setLoading(false);
  }

  return { verified, token: '', resent, loading, onResend };
}
