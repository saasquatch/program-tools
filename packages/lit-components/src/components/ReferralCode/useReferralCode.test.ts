import { describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt', id: 'user1', accountId: 'acc1' })),
  useEngagementMedium: vi.fn(() => 'EMBED'),
  useQuery: vi.fn(() => ({ data: { user: { referralCode: 'TESTCODE123' } }, loading: false })),
  useMutation: vi.fn(() => [vi.fn()]),
}));

const universalHooksMock = vi.hoisted(() => ({
  useState: vi.fn((initial: unknown) => [initial, vi.fn()] as const),
}));

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useReferralCode } from './useReferralCode';

describe('useReferralCode', () => {
  it('should return referral code from query', () => {
    const result = useReferralCode({ tooltipLifespan: 1000, programId: '' } as any);

    expect(result.copyString).toBe('TESTCODE123');
    expect(result.loading).toBe(false);
    expect(result.disabled).toBe(false);
  });

  it('should have onClick handler', () => {
    const result = useReferralCode({ tooltipLifespan: 1000, programId: '' } as any);

    expect(typeof result.onClick).toBe('function');
  });

  it('should not have error by default', () => {
    const result = useReferralCode({ tooltipLifespan: 1000, programId: '' } as any);

    expect(result.error).toBe('');
  });
});
