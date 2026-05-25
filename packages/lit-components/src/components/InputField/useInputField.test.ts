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

import { useInputField } from './useInputField';

describe('useInputField', () => {
  const defaultProps = {
    fieldLabel: 'Label',
    fieldName: 'field',
    fieldRequired: false,
    fieldDisabled: false,
    fieldType: 'text',
    fieldSize: 'medium',
    fieldValue: '',
    fieldMinLength: undefined,
    fieldMaxLength: undefined,
    fieldPattern: undefined,
    fieldPatternMessage: undefined,
  } as const;

  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial empty value', () => {
    const result = useInputField(defaultProps);

    expect(result.value).toBe('');
    expect(result.error).toBe('');
  });

  it('should handle required validation', () => {
    const result = useInputField({ ...defaultProps, fieldRequired: true });

    result.onBlur();

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('This field is required');
  });

  it('should handle minLength validation', () => {
    const result = useInputField({ ...defaultProps, fieldValue: 'abc', fieldMinLength: 5 });

    result.onBlur();

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Must be at least 5 characters');
  });

  it('should handle pattern validation', () => {
    const result = useInputField({
      ...defaultProps,
      fieldValue: 'ABC',
      fieldPattern: '^[a-z]+$',
      fieldPatternMessage: 'Only lowercase letters',
    });

    result.onBlur();

    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('Only lowercase letters');
  });
});
