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

import { usePagination } from './usePagination';

describe('usePagination', () => {
  beforeEach(() => {
    universalHooksMock.setters.length = 0;
    universalHooksMock.useState.mockClear();
  });

  it('should return initial page 1', () => {
    const result = usePagination({ currentPage: 1, totalPages: 5 });

    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(5);
    expect(result.hasPrev).toBe(false);
    expect(result.hasNext).toBe(true);
  });

  it('should handle single page', () => {
    const result = usePagination({ currentPage: 1, totalPages: 1 });

    expect(result.hasPrev).toBe(false);
    expect(result.hasNext).toBe(false);
  });

  it('should have navigation functions', () => {
    const result = usePagination({ currentPage: 1, totalPages: 5 });

    expect(typeof result.nextPage).toBe('function');
    expect(typeof result.prevPage).toBe('function');
    expect(typeof result.goToPage).toBe('function');
  });
});
