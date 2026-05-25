import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      viewer: {
        payoutDetails: {
          nextPayoutDate: '2025-01-31',
          availableBalance: '$42.00',
          currency: 'CAD',
          payoutMethod: 'PayPal',
        },
      },
    },
    loading: false,
  })),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);

import { usePayoutDetailsCard } from './usePayoutDetailsCard';

describe('usePayoutDetailsCard', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          payoutDetails: {
            nextPayoutDate: '2025-01-31',
            availableBalance: '$42.00',
            currency: 'CAD',
            payoutMethod: 'PayPal',
          },
        },
      },
      loading: false,
    });
  });

  it('returns payout details from query data', () => {
    const result = usePayoutDetailsCard({} as any);

    expect(result.nextPayoutDate).toBe('2025-01-31');
    expect(result.availableBalance).toBe('$42.00');
    expect(result.currency).toBe('CAD');
    expect(result.payoutMethod).toBe('PayPal');
  });

  it('returns default values when data is missing', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: { viewer: {} }, loading: false });

    const result = usePayoutDetailsCard({} as any);

    expect(result.nextPayoutDate).toBe('N/A');
    expect(result.availableBalance).toBe('$0.00');
    expect(result.currency).toBe('USD');
    expect(result.payoutMethod).toBe('Not configured');
  });

  it('returns the loading state from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = usePayoutDetailsCard({} as any);

    expect(result.loading).toBe(true);
  });
});
