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

import { useDropdownField } from './useDropdownField';

describe('useDropdownField', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return empty initial state', () => {
    const result = useDropdownField({ fieldOptions: '', fieldRequired: false } as any);

    expect(result.value).toBe('');
    expect(result.error).toBe('');
  });

  it('should parse JSON options', () => {
    const options = JSON.stringify([
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ]);
    const result = useDropdownField({ fieldOptions: options, fieldRequired: false } as any);

    expect(result.options).toHaveLength(2);
    expect(result.options[0].label).toBe('Option 1');
  });

  it('should parse comma-separated options', () => {
    const result = useDropdownField({
      fieldOptions: 'Apple, Banana, Cherry',
      fieldRequired: false,
    } as any);

    expect(result.options).toHaveLength(3);
    expect(result.options[0].value).toBe('Apple');
  });

  it('should have onChange handler', () => {
    const result = useDropdownField({ fieldOptions: '', fieldRequired: true } as any);

    result.onChange({ target: { value: '' } } as unknown as Event);

    expect(typeof result.onChange).toBe('function');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('');
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith('This field is required');
  });
});
