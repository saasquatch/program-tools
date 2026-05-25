import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      user: {
        rewards: {
          totalCount: 9,
          data: [{ id: 'reward-1', prettyValue: '$10.00', type: 'CREDIT' }],
        },
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

import { useRewardsTable } from './useRewardsTable';

describe('useRewardsTable', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        user: {
          rewards: {
            totalCount: 9,
            data: [{ id: 'reward-1', prettyValue: '$10.00', type: 'CREDIT' }],
          },
        },
      },
      loading: false,
    });
  });

  it('returns rewards from query data', () => {
    const result = useRewardsTable({} as any);

    expect(result.rewards).toHaveLength(1);
    expect(result.rewards[0]?.id).toBe('reward-1');
  });

  it('calculates total pages correctly', () => {
    const result = useRewardsTable({ perPage: '4' } as any);

    expect(result.totalPages).toBe(3);
  });

  it('uses 4 as the default per-page value', () => {
    useRewardsTable({} as any);

    expect(componentBoilerplateMock.useQuery).toHaveBeenCalledWith(expect.anything(), {
      programId: 'test-program',
      offset: 0,
      limit: 4,
    }, false);
  });

  it('returns empty when there are no rewards and not loading', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { rewards: { totalCount: 0, data: [] } } },
      loading: false,
    });

    const result = useRewardsTable({} as any);

    expect(result.empty).toBe(true);
  });
});
