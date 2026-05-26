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

import { useRoute } from './useRoute';

describe('useRoute', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
    vi.restoreAllMocks();
    vi.stubGlobal('window', {
      location: { hash: '' },
      addEventListener: vi.fn(),
    });
  });

  it('should check an exact hash match', () => {
    window.location.hash = '#/dashboard';
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener').mockImplementation(() => undefined);

    const result = useRoute({ path: '/dashboard', exact: true });

    expect(result.visible).toBe(false);
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(true);
    expect(addEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
  });

  it('should fail an exact hash match when the paths differ', () => {
    window.location.hash = '#/dashboard/settings';
    vi.spyOn(window, 'addEventListener').mockImplementation(() => undefined);

    useRoute({ path: '/dashboard', exact: true });

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(false);
  });

  it('should allow prefix matching when exact is false', () => {
    window.location.hash = '#/dashboard/settings';
    vi.spyOn(window, 'addEventListener').mockImplementation(() => undefined);

    useRoute({ path: '/dashboard', exact: false });

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(true);
  });
});
