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

import { useScroll } from './useScroll';

describe('useScroll', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial scroll state', () => {
    const result = useScroll({});

    expect(result.scrollTop).toBe(0);
    expect(result.isScrolled).toBe(false);
  });

  it('should have onScroll handler', () => {
    const result = useScroll({});

    result.onScroll({ target: { scrollTop: 24 } } as unknown as Event);

    expect(typeof result.onScroll).toBe('function');
    expect(universalHooksMock.setters[0]).toHaveBeenCalledWith(24);
  });
});
