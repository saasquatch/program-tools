import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  getEnvironmentSDK: vi.fn(() => ({ env: { googleOAuthId: undefined } })),
}));

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];
  const values: unknown[] = [];

  return {
    setters,
    values,
    useEffect: vi.fn((callback: () => void) => callback()),
    useState: vi.fn((initial: unknown) => {
      const index = setters.length;
      const setter = vi.fn();
      setters.push(setter);
      return [index < values.length ? values[index] : initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useEffect: universalHooksMock.useEffect,
  useState: universalHooksMock.useState,
}));

import { useGoogleSignIn } from './useGoogleSignIn';

describe('useGoogleSignIn', () => {
  const createHost = (container: HTMLElement | null = null) => ({
    dispatchEvent: vi.fn(),
    shadowRoot: {
      querySelector: vi.fn(() => container),
    },
  }) as unknown as HTMLElement;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    componentBoilerplateMock.getEnvironmentSDK.mockReturnValue({ env: { googleOAuthId: undefined } });

    const head = {
      querySelector: vi.fn(() => null),
      appendChild: vi.fn(),
    };

    vi.stubGlobal('document', {
      head,
      createElement: vi.fn(() => ({
        src: '',
        async: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    vi.stubGlobal('window', {
      clearTimeout,
      setTimeout,
    });
  });

  it('should show the fallback button when no client id is available', () => {
    const result = useGoogleSignIn(createHost(), { text: 'continue_with' });

    expect(result.showFallbackButton).toBe(true);
    expect(result.fallbackLabel).toBe('Continue with Google');
  });

  it('should initialize the google button when the api and client id are available', () => {
    const initialize = vi.fn();
    const renderButton = vi.fn();
    const container = { innerHTML: 'filled', clientWidth: 320 } as HTMLElement;
    const windowMock = {
      clearTimeout,
      setTimeout,
      google: { accounts: { id: { initialize, renderButton } } },
    };
    vi.stubGlobal('window', windowMock);

    const result = useGoogleSignIn(createHost(container), {
      text: 'signin_with',
      clientId: 'google-client-id',
    });

    expect(result.showFallbackButton).toBe(false);
    expect(result.fallbackLabel).toBe('Sign in with Google');
    expect(initialize).toHaveBeenCalledWith({
      client_id: 'google-client-id',
      callback: expect.any(Function),
    });
    expect(renderButton).toHaveBeenCalledWith(
      container,
      expect.objectContaining({ text: 'signin_with', width: 400 })
    );
  });

  it('should dispatch init-complete from the fallback button', () => {
    const host = createHost();
    const result = useGoogleSignIn(host, { text: 'signup_with', clientId: 'google-client-id' });

    result.onFallbackClick();

    expect(host.dispatchEvent).toHaveBeenCalledTimes(1);
    const event = (host.dispatchEvent as ReturnType<typeof vi.fn>).mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('init-complete');
    expect(event.detail).toEqual({ credential: null, clientId: 'google-client-id' });
  });
});
