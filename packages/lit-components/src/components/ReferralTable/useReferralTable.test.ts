import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: {
      user: {
        referrals: {
          totalCount: 9,
          data: [{ referredUser: { firstName: 'Jane', lastName: 'Doe' } }],
        },
      },
    },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => ({
  setter: vi.fn(),
  stateValue: 0,
  useState: vi.fn((initial: unknown) => [universalHooksMock.stateValue ?? initial, universalHooksMock.setter] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useReferralTable } from './useReferralTable';

describe('useReferralTable', () => {
  beforeEach(() => {
    universalHooksMock.stateValue = 0;
    universalHooksMock.setter.mockReset();
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        user: {
          referrals: {
            totalCount: 9,
            data: [{ referredUser: { firstName: 'Jane', lastName: 'Doe' } }],
          },
        },
      },
      loading: false,
    });
  });

  it('returns referrals from query data', () => {
    const result = useReferralTable({} as any);

    expect(result.referrals).toHaveLength(1);
    expect(result.referrals[0]?.referredUser?.firstName).toBe('Jane');
  });

  it('calculates total pages correctly', () => {
    const result = useReferralTable({ perPage: '4' } as any);

    expect(result.totalCount).toBe(9);
    expect(result.totalPages).toBe(3);
  });

  it('advances and rewinds pages', () => {
    const firstPage = useReferralTable({ perPage: '4' } as any);
    firstPage.nextPage();
    expect(universalHooksMock.setter).toHaveBeenCalledWith(1);

    universalHooksMock.setter.mockReset();
    universalHooksMock.stateValue = 1;
    const secondPage = useReferralTable({ perPage: '4' } as any);
    secondPage.prevPage();
    expect(universalHooksMock.setter).toHaveBeenCalledWith(0);
  });

  it('returns empty when there are no referrals and not loading', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { referrals: { totalCount: 0, data: [] } } },
      loading: false,
    });

    const result = useReferralTable({} as any);

    expect(result.empty).toBe(true);
  });

  it('uses 4 as the default per-page value', () => {
    useReferralTable({} as any);

    expect(componentBoilerplateMock.useQuery).toHaveBeenCalledWith(expect.anything(), {
      programId: 'test-program',
      offset: 0,
      limit: 4,
    }, false);
  });
});
