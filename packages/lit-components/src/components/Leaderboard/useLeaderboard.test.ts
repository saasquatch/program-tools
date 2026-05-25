import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      leaderboard: {
        rows: [
          { rank: 1, firstName: 'Jane', lastInitial: 'D', value: 10, statValue: 10 },
          null,
          { rank: 2, firstName: 'John', lastInitial: 'S', value: 8, statValue: 8 },
        ],
      },
    },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useLeaderboard } from './useLeaderboard';

describe('useLeaderboard', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        leaderboard: {
          rows: [
            { rank: 1, firstName: 'Jane', lastInitial: 'D', value: 10, statValue: 10 },
            null,
            { rank: 2, firstName: 'John', lastInitial: 'S', value: 8, statValue: 8 },
          ],
        },
      },
      loading: false,
    });
  });

  it('returns rows from the query data', () => {
    const result = useLeaderboard({ leaderboardType: 'referrals' } as any);

    expect(result.rows).toHaveLength(2);
    expect(result.rows[0]?.firstName).toBe('Jane');
  });

  it('returns empty when there are no rows and not loading', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { leaderboard: { rows: [] } },
      loading: false,
    });

    const result = useLeaderboard({ leaderboardType: 'referrals' } as any);

    expect(result.empty).toBe(true);
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { leaderboard: { rows: [] } },
      loading: true,
    });

    const result = useLeaderboard({ leaderboardType: 'referrals' } as any);

    expect(result.loading).toBe(true);
    expect(result.empty).toBe(false);
  });

  it('filters null rows from the result', () => {
    const result = useLeaderboard({ leaderboardType: 'referrals' } as any);

    expect(result.rows.some((row) => row == null)).toBe(false);
  });
});
