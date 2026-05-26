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

import { usePortalRegister } from './usePortalRegister';

describe('usePortalRegister', () => {
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
    const result = usePortalRegister({} as any);

    expect(result.email).toBe('');
    expect(result.password).toBe('');
    expect(result.confirmPassword).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
  });

  it('should validate empty fields', async () => {
    const result = usePortalRegister({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should validate password mismatch', async () => {
    universalHooksMock.values.push('test@example.com', 'password123', 'different-password');
    const result = usePortalRegister({ showConfirmPassword: true } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should validate minimum password length', async () => {
    universalHooksMock.values.push('test@example.com', 'short', 'short');
    const result = usePortalRegister({ passwordMinLength: 10 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Password must be at least 10 characters');
  });

  it('should dispatch a register event on submit', async () => {
    universalHooksMock.values.push('test@example.com', 'password123', 'password123');
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalRegister({ showConfirmPassword: true, passwordMinLength: 8 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[4]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[4]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:register');
    expect(event.detail).toEqual({ email: 'test@example.com', password: 'password123' });
  });

  it('should navigate to login', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalRegister({} as any);

    result.onLogin();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/login' });
  });
});
