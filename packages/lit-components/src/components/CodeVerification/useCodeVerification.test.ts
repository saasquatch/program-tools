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

import { useCodeVerification } from './useCodeVerification';

describe('useCodeVerification', () => {
  const createEvent = () => ({ preventDefault: vi.fn() }) as unknown as Event;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.useFakeTimers();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = useCodeVerification({ codeLength: '6' } as any);

    expect(result.code).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.resent).toBe(false);
  });

  it('should validate an invalid code length', () => {
    universalHooksMock.values.push('123');
    const result = useCodeVerification({ codeLength: '6' } as any);
    const event = createEvent();

    result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('Code must be 6 digits');
  });

  it('should dispatch the verify event for a valid code', () => {
    universalHooksMock.values.push('123456');
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useCodeVerification({ codeLength: '6' } as any);

    result.onSubmit(createEvent());

    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:code-verify');
    expect(event.detail).toEqual({ code: '123456' });
    expect(universalHooksMock.setters[2]).toHaveBeenNthCalledWith(2, false);
  });

  it('should dispatch the resend event and reset resent state after a timeout', () => {
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useCodeVerification({ codeLength: '6' } as any);

    result.onResend();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:code-resend');
    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(1, true);

    vi.advanceTimersByTime(3000);

    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(2, false);
  });
});
