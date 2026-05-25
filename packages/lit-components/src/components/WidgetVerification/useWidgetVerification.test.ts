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

import { useWidgetVerification } from './useWidgetVerification';

describe('useWidgetVerification', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
    vi.restoreAllMocks();
    vi.stubGlobal('document', { dispatchEvent: vi.fn() });
    vi.useFakeTimers();
  });

  it('should return the initial verification state', () => {
    const result = useWidgetVerification({ verificationType: 'email', headerText: 'Verify' });

    expect(result.verified).toBe(false);
    expect(result.step).toBe('input');
  });

  it('should dispatch a widget verification event and set step to verifying', () => {
    const dispatchSpy = vi.spyOn(document, 'dispatchEvent');
    const result = useWidgetVerification({ verificationType: 'code', headerText: 'Verify' });

    result.onVerify('123456');

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('verifying');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:widget-verify');
    expect(event.detail).toEqual({ type: 'code', code: '123456' });
  });

  it('should mark verification as successful after the timeout', () => {
    const result = useWidgetVerification({ verificationType: 'email', headerText: 'Verify' });

    result.onVerify('abc123');
    vi.advanceTimersByTime(1000);

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('success');
  });
});
