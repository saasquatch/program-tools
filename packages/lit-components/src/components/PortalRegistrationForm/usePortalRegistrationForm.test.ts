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

import { usePortalRegistrationForm } from './usePortalRegistrationForm';

describe('usePortalRegistrationForm', () => {
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
    const result = usePortalRegistrationForm({} as any);

    expect(result.firstName).toBe('');
    expect(result.lastName).toBe('');
    expect(result.email).toBe('');
    expect(result.password).toBe('');
    expect(result.confirmPassword).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.termsAccepted).toBe(false);
  });

  it('should require email and password', async () => {
    const result = usePortalRegistrationForm({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('Email and password are required');
  });

  it('should require name fields when enabled', async () => {
    universalHooksMock.values.push('', '', 'test@example.com', 'password123', 'password123');
    const result = usePortalRegistrationForm({ showNameFields: true } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('Name fields are required');
  });

  it('should validate password mismatch', async () => {
    universalHooksMock.values.push('', '', 'test@example.com', 'password123', 'different-password');
    const result = usePortalRegistrationForm({ showConfirmPassword: true } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should validate minimum password length', async () => {
    universalHooksMock.values.push('', '', 'test@example.com', 'short', 'short');
    const result = usePortalRegistrationForm({ passwordMinLength: 10 } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('Password must be at least 10 characters');
  });

  it('should require terms acceptance when terms are shown', async () => {
    universalHooksMock.values.push('', '', 'test@example.com', 'password123', 'password123', '', false, false);
    const result = usePortalRegistrationForm({ termsText: 'Terms and conditions' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('You must accept the terms');
  });

  it('should dispatch a registration event on successful submit', async () => {
    universalHooksMock.values.push('Jane', 'Doe', 'jane@example.com', 'password123', 'password123', '', false, true);
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalRegistrationForm({
      showNameFields: true,
      showConfirmPassword: true,
      passwordMinLength: 8,
      termsText: 'Terms and conditions',
    } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:registration-submit');
    expect(event.detail).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'password123',
    });
  });
});
