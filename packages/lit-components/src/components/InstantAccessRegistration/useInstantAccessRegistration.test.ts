import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
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

import { useInstantAccessRegistration } from './useInstantAccessRegistration';

describe('useInstantAccessRegistration', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = useInstantAccessRegistration({ programId: '' } as any);

    expect(result.email).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
  });

  it('should validate an empty email', async () => {
    const result = useInstantAccessRegistration({ programId: '' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('Email is required');
  });

  it('should validate an invalid email', async () => {
    universalHooksMock.values.push('invalid-email');
    const result = useInstantAccessRegistration({ programId: '' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('Please enter a valid email');
  });

  it('should dispatch the instant access event for a valid email', async () => {
    universalHooksMock.values.push('user@example.com');
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useInstantAccessRegistration({ programId: 'fallback-program' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:instant-access');
    expect(event.detail).toEqual({ email: 'user@example.com', programId: 'test-program' });
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
  });
});
