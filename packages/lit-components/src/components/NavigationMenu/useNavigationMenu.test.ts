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

import { useNavigationMenu } from './useNavigationMenu';

describe('useNavigationMenu', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return the initial state', () => {
    const result = useNavigationMenu({} as never);

    expect(result.selectedIndex).toBe(0);
    expect(result.isOpen).toBe(false);
    expect(universalHooksMock.useState).toHaveBeenNthCalledWith(1, 0);
    expect(universalHooksMock.useState).toHaveBeenNthCalledWith(2, false);
  });

  it('should update the selected index and close the menu on select', () => {
    const result = useNavigationMenu({} as never);

    result.onSelect(2);

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(2);
    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith(false);
  });

  it('should toggle the menu open state', () => {
    const result = useNavigationMenu({} as never);

    result.toggleMenu();

    expect(universalHooksMock.setters[1]).toHaveBeenCalledWith(true);
  });
});
