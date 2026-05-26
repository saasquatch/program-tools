import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { usePopupContainer } from './usePopupContainer';

describe('usePopupContainer', () => {
  beforeEach(() => {
    universalHooksMock.useState.mockClear();
  });

  it('should start open by default', () => {
    const result = usePopupContainer({});

    expect(result.isOpen).toBe(true);
  });

  it('should have close function', () => {
    const result = usePopupContainer({});

    expect(typeof result.close).toBe('function');
  });
});
