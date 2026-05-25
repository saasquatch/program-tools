import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];

  return {
    setters,
    useState: vi.fn((initial: unknown) => {
      const setter = vi.fn();
      setters.push(setter);
      return [initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useEmailVerification } from './useEmailVerification';

describe('useEmailVerification', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    universalHooksMock.setters.length = 0;
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
  });

  it('should return initial state', () => {
    const result = useEmailVerification({} as any);

    expect(result.resent).toBe(false);
    expect(result.loading).toBe(false);
  });

  it('should dispatch the resend event and update state', () => {
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useEmailVerification({} as any);

    result.onResend();

    expect(universalHooksMock.setters[1]).toHaveBeenNthCalledWith(1, true);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:email-resend');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[1]).toHaveBeenNthCalledWith(2, false);
  });
});
