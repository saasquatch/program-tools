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

import { useIndirectTaxForm } from './useIndirectTaxForm';

describe('useIndirectTaxForm', () => {
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
    const result = useIndirectTaxForm({ programId: '' } as any);

    expect(result.taxId).toBe('');
    expect(result.country).toBe('');
    expect(result.error).toBe('');
    expect(result.loading).toBe(false);
    expect(result.success).toBe(false);
  });

  it('should validate a missing tax id', async () => {
    const result = useIndirectTaxForm({ programId: '' } as any);
    const event = createEvent();

    await result.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Tax ID is required');
  });

  it('should dispatch the tax form submit event', async () => {
    universalHooksMock.values.push('VAT-123', 'CA');
    const dispatchSpy = document.dispatchEvent as ReturnType<typeof vi.fn>;
    const result = useIndirectTaxForm({ programId: 'fallback-program' } as any);

    await result.onSubmit(createEvent());

    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(1, true);
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    const event = dispatchSpy.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('sq:tax-form-submit');
    expect(event.detail).toEqual({ taxId: 'VAT-123', country: 'CA', programId: 'test-program' });
    expect(universalHooksMock.setters[4]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[3]).toHaveBeenNthCalledWith(2, false);
  });
});
