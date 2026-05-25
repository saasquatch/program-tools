import { beforeEach, describe, expect, it, vi } from 'vitest';

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useTaskCard } from './useTaskCard';

describe('useTaskCard', () => {
  beforeEach(() => {
    universalHooksMock.useState.mockClear();
  });

  it('should calculate progress correctly', () => {
    const result = useTaskCard({ progressCurrent: 5, progressGoal: 10, cardStatus: 'incomplete' } as any);

    expect(result.progress).toBe(50);
    expect(result.isComplete).toBe(false);
  });

  it('should cap progress at 100%', () => {
    const result = useTaskCard({ progressCurrent: 15, progressGoal: 10, cardStatus: 'incomplete' } as any);

    expect(result.progress).toBe(100);
  });

  it('should detect completed status', () => {
    const result = useTaskCard({ progressCurrent: 10, progressGoal: 10, cardStatus: 'incomplete' } as any);

    expect(result.isComplete).toBe(true);
  });

  it('should detect complete from cardStatus prop', () => {
    const result = useTaskCard({ progressCurrent: 0, progressGoal: 10, cardStatus: 'complete' } as any);

    expect(result.isComplete).toBe(true);
  });

  it('should detect expired status', () => {
    const result = useTaskCard({ progressCurrent: 0, progressGoal: 10, cardStatus: 'expired' } as any);

    expect(result.isExpired).toBe(true);
  });

  it('should have onClick handler', () => {
    const result = useTaskCard({
      progressCurrent: 0,
      progressGoal: 10,
      cardStatus: 'incomplete',
      buttonLink: 'https://example.com',
    } as any);

    expect(typeof result.onClick).toBe('function');
  });
});
