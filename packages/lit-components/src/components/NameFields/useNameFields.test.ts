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

import { useNameFields } from './useNameFields';

describe('useNameFields', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial empty state', () => {
    const result = useNameFields({ fieldRequired: false } as any);

    expect(result.firstName).toBe('');
    expect(result.lastName).toBe('');
    expect(result.firstNameError).toBe('');
    expect(result.lastNameError).toBe('');
  });

  it('should have input handlers', () => {
    const result = useNameFields({ fieldRequired: true } as any);

    result.onFirstNameInput({ target: { value: '' } } as unknown as Event);
    result.onLastNameInput({ target: { value: '' } } as unknown as Event);

    expect(typeof result.onFirstNameInput).toBe('function');
    expect(typeof result.onLastNameInput).toBe('function');
    expect(universalHooksMock.setters[2]).toHaveBeenCalledWith('First name is required');
    expect(universalHooksMock.setters[3]).toHaveBeenCalledWith('Last name is required');
  });
});
