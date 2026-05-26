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

import { useBaseRegistration } from './useBaseRegistration';

describe('useBaseRegistration', () => {
  const props = {
    requiredFieldErrorMessage: 'Email is required',
    invalidEmailErrorMessage: 'Please enter a valid email',
  } as const;
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = useBaseRegistration(props as any);

    expect(result.email).toBe('');
    expect(result.validationErrors).toEqual({});
    expect(result.loading).toBe(false);
  });

  it('should validate an empty email', async () => {
    const result = useBaseRegistration(props as any);
    const event = createEvent();

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith({ email: 'Email is required' });
  });

  it('should validate an invalid email', async () => {
    universalHooksMock.values.push('invalid-email');
    const result = useBaseRegistration(props as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith({
      email: 'Please enter a valid email',
    });
  });

  it('should dispatch the submit event for a valid email', async () => {
    universalHooksMock.values.push('user@example.com');
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useBaseRegistration(props as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith({});
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:base-registration-submit');
    expect(event.detail).toEqual({ email: 'user@example.com' });
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
  });
});
