import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  isDemo: vi.fn(() => false),
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt', id: 'user1', accountId: 'acc1' })),
  useQuery: vi.fn(() => ({
    data: {
      viewer: {
        referrals: { totalCount: 5 },
        rewards: { totalCount: 10 },
        customFields: { myField: '42' },
        programGoals: [{ goalId: 'g1', programId: 'test-program', count: 7, conversionCount: 3 }],
        rewardBalanceDetails: [{ prettyAvailableValue: '$25.00' }],
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

import { useBigStat } from './useBigStat';

describe('useBigStat', () => {
  beforeEach(() => {
    componentBoilerplateMock.isDemo.mockReturnValue(false);
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt', id: 'user1', accountId: 'acc1' });
    componentBoilerplateMock.useQuery.mockClear();
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          referrals: { totalCount: 5 },
          rewards: { totalCount: 10 },
          customFields: { myField: '42' },
          programGoals: [{ goalId: 'g1', programId: 'test-program', count: 7, conversionCount: 3 }],
          rewardBalanceDetails: [{ prettyAvailableValue: '$25.00' }],
        },
      },
      loading: false,
    });
  });

  it('returns the default result for invalid or empty stat types', () => {
    expect(useBigStat({ statType: '' } as any)).toEqual({
      value: 0,
      statvalue: '-',
      loading: false,
      label: 'BAD PROP TYPE',
    });

    expect(useBigStat({ statType: '/not-a-stat' } as any)).toEqual({
      value: 0,
      statvalue: '-',
      loading: false,
      label: 'BAD PROP TYPE',
    });
  });

  it('returns the referrals count stat', () => {
    const result = useBigStat({ statType: '/referralsCount' } as any);

    expect(result.label).toBe('Referrals - Count');
    expect(result.value).toBe(5);
    expect(result.statvalue).toBe('5');
  });

  it('returns the rewards count stat', () => {
    const result = useBigStat({ statType: '/rewardsCount' } as any);

    expect(result.label).toBe('Rewards');
    expect(result.value).toBe(10);
    expect(result.statvalue).toBe('10');
  });

  it('returns the custom field stat', () => {
    const result = useBigStat({ statType: '/customFields/myField' } as any);

    expect(result.value).toBe(42);
    expect(result.statvalue).toBe('42');
  });

  it('returns the program goal stat', () => {
    const result = useBigStat({ statType: '/programGoals/count/g1' } as any);

    expect(result.value).toBe(7);
    expect(result.statvalue).toBe('7');
  });

  it('returns the reward balance stat', () => {
    const result = useBigStat({ statType: '/rewardBalance/CREDIT/POINT/prettyValue' } as any);

    expect(result.value).toBe(25);
    expect(result.statvalue).toBe('$25.00');
  });

  it('shows ellipsis while loading', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: {
        viewer: {
          referrals: { totalCount: 5 },
        },
      },
      loading: true,
    });

    const result = useBigStat({ statType: '/referralsCount' } as any);

    expect(result.loading).toBe(true);
    expect(result.statvalue).toBe('...');
  });

  it('skips the query when there is no user jwt', () => {
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: '', id: 'user1', accountId: 'acc1' });

    useBigStat({ statType: '/referralsCount' } as any);

    expect(componentBoilerplateMock.useQuery).toHaveBeenCalledWith(expect.anything(), expect.anything(), true);
  });
});
