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

import { useCheckboxField } from './useCheckboxField';

describe('useCheckboxField', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial unchecked state', () => {
    const result = useCheckboxField({ fieldChecked: false, fieldRequired: false } as any);

    expect(result.checked).toBe(false);
    expect(result.error).toBe('');
  });

  it('should return initial checked state when fieldChecked is true', () => {
    const result = useCheckboxField({ fieldChecked: true, fieldRequired: false } as any);

    expect(result.checked).toBe(true);
  });

  it('should have onChange handler', () => {
    const result = useCheckboxField({ fieldChecked: false, fieldRequired: true } as any);

    result.onChange({ target: { checked: false } } as unknown as Event);

    expect(typeof result.onChange).toBe('function');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(false);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('This field is required');
  });
});
