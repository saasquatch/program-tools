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

import { usePortalChangePassword } from './usePortalChangePassword';

describe('usePortalChangePassword', () => {
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
    const result = usePortalChangePassword({} as any);

    expect(result.currentPassword).toBe('');
    expect(result.newPassword).toBe('');
    expect(result.confirmPassword).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
    expect(result.isOpen).toBe(false);
  });

  it('should open and close the modal', () => {
    const result = usePortalChangePassword({} as any);

    result.open();
    result.close();

    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(2, false);
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith(false);
  });

  it('should validate empty fields', async () => {
    const result = usePortalChangePassword({} as any);
    const event = createEvent() as any;

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('All fields are required');
  });

  it('should validate password mismatch', async () => {
    universalHooksMock.values.push('current-password', 'new-password', 'different-password');
    const result = usePortalChangePassword({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should validate minimum password length', async () => {
    universalHooksMock.values.push('current-password', 'short', 'short');
    const result = usePortalChangePassword({ passwordMinLength: 10 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Password must be at least 10 characters');
  });

  it('should dispatch a change-password event on successful submit', async () => {
    universalHooksMock.values.push('current-password', 'new-password-123', 'new-password-123');
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalChangePassword({ passwordMinLength: 8 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[4]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[4]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:change-password');
    expect(event.detail).toEqual({
      currentPassword: 'current-password',
      newPassword: 'new-password-123',
    });
  });
});
