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

import { useTabs } from './useTabs';

describe('useTabs', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return the initial active tab', () => {
    const result = useTabs();

    expect(result.activeTab).toBe(0);
    expect(universalHooksMock.useState).toHaveBeenCalledWith(0);
  });

  it('should update the active tab on click', () => {
    const result = useTabs();

    result.onTabClick(3);

    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(3);
  });
});
