import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];

  return {
    setters,
    useState: vi.fn((initial: unknown) => {
      const setter = vi.fn();
      setters.push(setter);
      return [initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useRouter } from './useRouter';

describe('useRouter', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
    vi.restoreAllMocks();
    vi.stubGlobal('window', {
      location: { hash: '' },
      addEventListener: vi.fn(),
    });
    vi.stubGlobal('document', {
      addEventListener: vi.fn(),
    });
  });

  it('should return / as the initial path when there is no hash', () => {
    vi.spyOn(window, 'addEventListener').mockImplementation(() => undefined);
    vi.spyOn(document, 'addEventListener').mockImplementation(() => undefined);

    const result = useRouter();

    expect(result.currentPath).toBe('/');
    expect(universalHooksMock.useState).toHaveBeenCalledWith('/');
  });

  it('should return the current hash path', () => {
    window.location.hash = '#/account';
    vi.spyOn(window, 'addEventListener').mockImplementation(() => undefined);
    vi.spyOn(document, 'addEventListener').mockImplementation(() => undefined);

    const result = useRouter();

    expect(result.currentPath).toBe('/account');
  });

  it('should update currentPath from hashchange and sq:navigate listeners', () => {
    let hashChangeListener: EventListener | undefined;
    let navigateListener: EventListener | undefined;

    vi.spyOn(window, 'addEventListener').mockImplementation(((type, listener) => {
      if (type === 'hashchange') {
        hashChangeListener = listener as EventListener;
      }
    }) as typeof window.addEventListener);

    vi.spyOn(document, 'addEventListener').mockImplementation(((type, listener) => {
      if (type === 'sq:navigate') {
        navigateListener = listener as EventListener;
      }
    }) as typeof document.addEventListener);

    useRouter();

    window.location.hash = '#/profile';
    hashChangeListener?.(new Event('hashchange'));
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('/profile');

    navigateListener?.(new CustomEvent('sq:navigate', { detail: { path: '/rewards' } }));
    expect(window.location.hash).toBe('/rewards');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('/rewards');
  });
});
