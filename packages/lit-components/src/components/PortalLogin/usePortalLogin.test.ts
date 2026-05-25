import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  isDemo: vi.fn(() => false),
  useMutation: vi.fn(() => [vi.fn()]),
  useUserIdentity: vi.fn(() => null),
}));

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

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePortalLogin } from './usePortalLogin';

describe('usePortalLogin', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    universalHooksMock.useState.mockClear();
    componentBoilerplateMock.isDemo.mockClear();
    componentBoilerplateMock.useMutation.mockClear();
    componentBoilerplateMock.useUserIdentity.mockClear();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = usePortalLogin({} as any);

    expect(result.email).toBe('');
    expect(result.password).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
  });

  it('should validate empty fields', async () => {
    const result = usePortalLogin({} as any);
    const event = createEvent() as any;

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should dispatch a login event on submit', async () => {
    universalHooksMock.values.push('test@example.com', 'secret-password');
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalLogin({} as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(2, false);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:login');
    expect(event.detail).toEqual({ email: 'test@example.com', password: 'secret-password' });
  });

  it('should navigate to forgot password', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalLogin({} as any);

    result.onForgotPassword();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/forgot-password' });
  });

  it('should navigate to register', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = usePortalLogin({} as any);

    result.onRegister();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:navigate');
    expect(event.detail).toEqual({ path: '/register' });
  });
});
