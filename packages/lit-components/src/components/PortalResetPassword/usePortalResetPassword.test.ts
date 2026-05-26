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

import { usePortalResetPassword } from './usePortalResetPassword';

describe('usePortalResetPassword', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

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
    const result = usePortalResetPassword({} as any);

    expect(result.password).toBe('');
    expect(result.confirmPassword).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
    expect(result.resetCode).toBe('');
  });

  it('should extract resetCode from the url', () => {
    window.history.replaceState({}, '', '/?oobCode=reset-token');

    const result = usePortalResetPassword({} as any);

    expect(result.resetCode).toBe('reset-token');
  });

  it('should validate a missing resetCode', async () => {
    const result = usePortalResetPassword({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Invalid or expired reset link');
  });

  it('should validate a missing password', async () => {
    window.history.replaceState({}, '', '/?oobCode=reset-token');
    const result = usePortalResetPassword({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Password is required');
  });

  it('should validate password mismatch', async () => {
    window.history.replaceState({}, '', '/?oobCode=reset-token');
    universalHooksMock.values.push('password123', 'different-password');
    const result = usePortalResetPassword({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should validate minimum password length', async () => {
    window.history.replaceState({}, '', '/?oobCode=reset-token');
    universalHooksMock.values.push('short', 'short');
    const result = usePortalResetPassword({ passwordMinLength: 10 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Password must be at least 10 characters');
  });

  it('should dispatch a reset-password event on successful submit', async () => {
    window.history.replaceState({}, '', '/?oobCode=reset-token');
    universalHooksMock.values.push('password123', 'password123');
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalResetPassword({ passwordMinLength: 8 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:reset-password');
    expect(event.detail).toEqual({ password: 'password123', resetCode: 'reset-token' });
  });
});
