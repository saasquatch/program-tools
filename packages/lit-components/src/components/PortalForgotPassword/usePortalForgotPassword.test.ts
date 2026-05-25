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

import { usePortalForgotPassword } from './usePortalForgotPassword';

describe('usePortalForgotPassword', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    universalHooksMock.useState.mockClear();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = usePortalForgotPassword({} as any);

    expect(result.email).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
  });

  it('should validate an empty email', async () => {
    const result = usePortalForgotPassword({} as any);
    const event = createEvent() as any;

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('Email is required');
  });

  it('should dispatch a forgot-password event on submit', async () => {
    universalHooksMock.values.push('test@example.com');
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalForgotPassword({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:forgot-password');
    expect(event.detail).toEqual({ email: 'test@example.com' });
  });

  it('should dispatch a navigate event to login on back', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalForgotPassword({} as any);

    result.onBack();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/login' });
  });
});
