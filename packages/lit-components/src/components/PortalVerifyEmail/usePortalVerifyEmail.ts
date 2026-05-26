import { useState } from '@saasquatch/universal-hooks';
import type { PortalVerifyEmailProps } from './PortalVerifyEmail';

export function usePortalVerifyEmail(_props: PortalVerifyEmailProps) {
  const [status] = useState<'verifying' | 'success' | 'error'>('verifying');

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('oobCode') || urlParams.get('token') || '';

  if (!token) {
    // BUG TRANSFERRED: In mint-components, if no token is found, the component stays in
    // 'verifying' state indefinitely rather than showing an error. We replicate it here.
  }

  return { status, token };
}

export function useDemoPortalVerifyEmail(_props: PortalVerifyEmailProps): ReturnType<typeof usePortalVerifyEmail> {
  const [status] = useState<'verifying' | 'success' | 'error'>('success');

  return { status, token: 'demo-token' };
}
