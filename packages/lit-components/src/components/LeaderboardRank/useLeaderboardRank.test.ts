import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({ data: { viewer: { leaderboardRank: { rank: 4 } } }, loading: false })),
}));

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useLeaderboardRank } from './useLeaderboardRank';

describe('useLeaderboardRank', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { leaderboardRank: { rank: 4 } } },
      loading: false,
    });
  });

  it('returns the rank from query data', () => {
    const result = useLeaderboardRank({ leaderboardType: 'referrals', unrankedText: 'Unranked' } as any);

    expect(result.rank).toBe(4);
  });

  it('returns the formatted rank text', () => {
    const result = useLeaderboardRank({
      leaderboardType: 'referrals',
      rankTextFormat: 'Rank #{rank}',
      unrankedText: 'Unranked',
    } as any);

    expect(result.rankText).toBe('Rank #4');
  });

  it('returns the unranked text when rank is undefined', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { leaderboardRank: { rank: null } } },
      loading: false,
    });

    const result = useLeaderboardRank({ leaderboardType: 'referrals', unrankedText: 'Unranked' } as any);

    expect(result.rank).toBeUndefined();
    expect(result.rankText).toBe('Unranked');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { viewer: { leaderboardRank: { rank: 4 } } },
      loading: true,
    });

    const result = useLeaderboardRank({ leaderboardType: 'referrals', unrankedText: 'Unranked' } as any);

    expect(result.loading).toBe(true);
  });
});
