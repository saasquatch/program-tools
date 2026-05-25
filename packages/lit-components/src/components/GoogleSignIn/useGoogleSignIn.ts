import { getEnvironmentSDK } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import type { GoogleSignInProps } from './GoogleSignIn';

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';

interface GoogleCredentialResponse {
  credential?: string | null;
  select_by?: string;
  clientId?: string;
}

interface GoogleAccountsApi {
  id: {
    initialize: (options: {
      client_id: string;
      callback: (response: GoogleCredentialResponse) => void;
    }) => void;
    renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
  };
}

declare global {
  interface Window {
    google?: { accounts?: GoogleAccountsApi };
  }
}

export interface GoogleSignInHookResult {
  showFallbackButton: boolean;
  fallbackLabel: string;
  onFallbackClick: () => void;
}

function normalizeGoogleText(text?: string) {
  if (text === 'signup_with' || text === 'signin_with' || text === 'continue_with' || text === 'signin') {
    return text;
  }
  return 'continue_with';
}

function getFallbackLabel(text?: string) {
  switch (text) {
    case 'signup_with':
      return 'Sign up with Google';
    case 'signin_with':
      return 'Sign in with Google';
    case 'signin':
      return 'Sign in';
    case 'continue_with':
      return 'Continue with Google';
    default:
      return text || 'Continue with Google';
  }
}

function getResolvedClientId(props: GoogleSignInProps) {
  if (props.clientId) {
    return props.clientId;
  }

  try {
    const sdk = getEnvironmentSDK() as { env?: { googleOAuthId?: string } };
    return sdk?.env?.googleOAuthId;
  } catch {
    return undefined;
  }
}

function emitInitComplete(host: HTMLElement, detail: GoogleCredentialResponse) {
  host.dispatchEvent(
    new CustomEvent('init-complete', {
      bubbles: true,
      composed: true,
      detail,
    })
  );
}

export function useGoogleSignIn(host: HTMLElement, props: GoogleSignInProps): GoogleSignInHookResult {
  const [loaded, setLoaded] = useState(
    typeof window !== 'undefined' && Boolean(window.google?.accounts?.id)
  );
  const [buttonWidth, setButtonWidth] = useState(400);
  const normalizedText = normalizeGoogleText(props.text);
  const fallbackLabel = getFallbackLabel(props.text);
  const clientId = getResolvedClientId(props);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.google?.accounts?.id) {
      setLoaded(true);
      return;
    }

    const existing = document.head.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`) as
      | HTMLScriptElement
      | null;

    const handleLoad = () => setLoaded(true);

    if (existing) {
      existing.addEventListener('load', handleLoad);
      return () => existing.removeEventListener('load', handleLoad);
    }

    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.addEventListener('load', handleLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const container = host.shadowRoot?.querySelector('.google-sign-in-button') as HTMLElement | null;
    if (!container) {
      return;
    }

    let timeoutId: number | undefined;
    const updateWidth = () => setButtonWidth(container.clientWidth || 400);
    updateWidth();

    const observer = new ResizeObserver(() => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(updateWidth, 50);
    });

    observer.observe(container);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      observer.disconnect();
    };
  }, [host]);

  useEffect(() => {
    const container = host.shadowRoot?.querySelector('.google-sign-in-button') as HTMLElement | null;
    const google = window.google;

    if (!container || !loaded || !clientId || !google?.accounts?.id) {
      return;
    }

    container.innerHTML = '';
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => emitInitComplete(host, response),
    });
    google.accounts.id.renderButton(container, {
      theme: 'outline',
      size: 'large',
      text: normalizedText,
      height: 40,
      width: buttonWidth,
    });
  }, [host, loaded, clientId, normalizedText, buttonWidth]);

  return {
    showFallbackButton: !loaded || !clientId,
    fallbackLabel,
    onFallbackClick: () => emitInitComplete(host, { credential: null, clientId }),
  };
}
