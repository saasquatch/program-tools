import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      user: {
        rewardBalanceDetails: [
          {
            prettyValue: '$125.00',
            exchangeList: [{ id: 'reward-1', name: 'Gift Card', costPrettyValue: '$25.00', available: true }],
          },
        ],
      },
    },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { useRewardExchangeList } from './useRewardExchangeList';

describe('useRewardExchangeList', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        user: {
          rewardBalanceDetails: [
            {
              prettyValue: '$125.00',
              exchangeList: [{ id: 'reward-1', name: 'Gift Card', costPrettyValue: '$25.00', available: true }],
            },
          ],
        },
      },
      loading: false,
    });
  });

  it('returns exchanges from the first balance detail', () => {
    const result = useRewardExchangeList({} as any);

    expect(result.exchanges).toHaveLength(1);
    expect(result.exchanges[0]?.name).toBe('Gift Card');
  });

  it('returns the current balance from the first balance detail', () => {
    const result = useRewardExchangeList({} as any);

    expect(result.currentBalance).toBe('$125.00');
  });

  it('returns empty when no exchanges are available', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { rewardBalanceDetails: [{ prettyValue: '$0.00', exchangeList: [] }] } },
      loading: false,
    });

    const result = useRewardExchangeList({} as any);

    expect(result.empty).toBe(true);
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useRewardExchangeList({} as any);

    expect(result.loading).toBe(true);
  });
});
