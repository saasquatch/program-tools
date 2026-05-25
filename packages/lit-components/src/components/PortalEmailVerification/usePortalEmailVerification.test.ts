import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];
  const values: unknown[] = [];

  return {
    setters,
    values,
    useState: vi.fn((initial: unknown) => {
      const index = setters.length;
      const setter = vi.fn();
      setters.push(setter);
      return [index < values.length ? values[index] : initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePortalEmailVerification } from './usePortalEmailVerification';

describe('usePortalEmailVerification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    universalHooksMock.useState.mockClear();

    const windowMock = {
      location: { search: '' },
      history: {
        replaceState: vi.fn((_state: unknown, _title: string, url: string) => {
          windowMock.location.search = url.includes('?') ? url.slice(url.indexOf('?')) : '';
        }),
      },
    };

    vi.stubGlobal('window', windowMock);
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = usePortalEmailVerification({} as any);

    expect(result.verified).toBe(false);
    expect(result.token).toBe('');
    expect(result.resent).toBe(false);
    expect(result.loading).toBe(false);
  });

  it('should extract the token from the url', () => {
    window.history.replaceState({}, '', '/?oobCode=test-token');

    const result = usePortalEmailVerification({} as any);

    expect(result.token).toBe('test-token');
  });

  it('should dispatch a resend-verification event', async () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalEmailVerification({} as any);

    await result.onResend();

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:resend-verification');
    expect(event.detail).toBe(null);
  });
});
