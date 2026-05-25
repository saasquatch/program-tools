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

import { useUserInfoForm } from './useUserInfoForm';

describe('useUserInfoForm', () => {
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
    const result = useUserInfoForm({ programId: '' } as any);

    expect(result.firstName).toBe('');
    expect(result.lastName).toBe('');
    expect(result.email).toBe('');
    expect(result.phone).toBe('');
    expect(result.country).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
  });

  it('should validate required fields', async () => {
    const result = useUserInfoForm({ programId: '' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith(
      'First name, last name, and email are required'
    );
  });

  it('should dispatch the user info submit event', async () => {
    universalHooksMock.values.push('Ada', 'Lovelace', 'ada@example.com', '555-1234', 'CA');
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useUserInfoForm({ programId: 'fallback-program' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[5]).toHaveBeenCalledWith('');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:user-info-submit');
    expect(event.detail).toEqual({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      phone: '555-1234',
      country: 'CA',
      programId: 'test-program',
    });
    expect(universalHooksMock.setters[6]).toHaveBeenNthCalledWith(2, false);
  });
});
