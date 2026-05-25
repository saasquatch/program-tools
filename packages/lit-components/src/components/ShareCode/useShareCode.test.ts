import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendLoadEventMock = vi.hoisted(() => vi.fn());

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt', id: 'user1', accountId: 'acc1' })),
  useEngagementMedium: vi.fn(() => 'EMBED'),
  useQuery: vi.fn(() => ({ data: { user: { referralCode: 'CODE123' } }, loading: false })),
  useMutation: vi.fn(() => [sendLoadEventMock]),
}));

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useShareCode } from './useShareCode';

describe('useShareCode', () => {
  beforeEach(() => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { referralCode: 'CODE123' } },
      loading: false,
    });
    componentBoilerplateMock.useMutation.mockReturnValue([sendLoadEventMock]);
  });

  it('returns the referral code as copyString', () => {
    const result = useShareCode({ tooltipLifespan: 1000 } as any);

    expect(result.copyString).toBe('CODE123');
  });

  it('returns loading and disabled from the query', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: undefined, loading: true });

    const result = useShareCode({ tooltipLifespan: 1000 } as any);

    expect(result.loading).toBe(true);
    expect(result.disabled).toBe(true);
  });

  it('returns an onClick handler', () => {
    const result = useShareCode({ tooltipLifespan: 1000 } as any);

    expect(typeof result.onClick).toBe('function');
  });

  it('returns ellipsis as the default copy string when no data exists', () => {
    componentBoilerplateMock.useQuery.mockReturnValue({ data: { user: {} }, loading: false });

    const result = useShareCode({ tooltipLifespan: 1000 } as any);

    expect(result.copyString).toBe('...');
  });
});
