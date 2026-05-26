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

import { usePasswordField } from './usePasswordField';

describe('usePasswordField', () => {
  const defaultProps = {
    fieldLabel: 'Password',
    fieldName: 'password',
    fieldRequired: false,
    fieldDisabled: false,
    fieldMinLength: 8,
    fieldMaxLength: undefined,
    fieldSize: 'medium',
    showToggle: true,
  } as const;

  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial state', () => {
    const result = usePasswordField(defaultProps);

    expect(result.value).toBe('');
    expect(result.error).toBe('');
    expect(result.showPassword).toBe(false);
  });

  it('should have togglePassword function', () => {
    const result = usePasswordField(defaultProps);

    result.togglePassword();

    expect(typeof result.togglePassword).toBe('function');
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith(true);
  });

  it('should have input and blur handlers', () => {
    const result = usePasswordField({ ...defaultProps, fieldRequired: true });

    result.onInput({ target: { value: 'secret' } } as unknown as Event);
    result.onBlur();

    expect(typeof result.onInput).toBe('function');
    expect(typeof result.onBlur).toBe('function');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith('secret');
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith(true);
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('This field is required');
  });
});
