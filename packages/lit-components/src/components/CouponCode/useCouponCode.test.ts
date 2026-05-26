import { beforeEach, describe, expect, it, vi } from 'vitest';

const componentBoilerplateMock = vi.hoisted(() => ({
  useProgramId: vi.fn(() => 'test-program'),
  useUserIdentity: vi.fn(() => ({ jwt: 'test-jwt' })),
  useQuery: vi.fn(() => ({
    data: { user: { rewards: { data: [{ fuelTankCode: 'CODE123', statuses: [] }] } } },
    loading: false,
  })),
}));

const universalHooksMock = vi.hoisted(() => {
  const setters: Array<ReturnType<typeof vi.fn>> = [];
  const values: unknown[] = [];

  return {
    setters,
    values,
    useState: vi.fn((initial: unknown) => {
      const index = setters.length;
      const setter = vi.fn();
      setters.push(setter);
      return [index < values.length ? values[index] : initial, setter] as const;
    }),
  };
});

vi.mock('@saasquatch/component-boilerplate', () => componentBoilerplateMock);
vi.mock('@saasquatch/universal-hooks', () => ({
  useState: universalHooksMock.useState,
}));

import { useCouponCode } from './useCouponCode';

describe('useCouponCode', () => {
  const props = {
    programId: 'fallback-program',
    rewardKey: 'reward-key',
    tooltipLifespan: 2000,
    errorTextPending: 'Pending',
    errorTextCancelled: 'Cancelled',
    errorTextExpired: 'Expired',
    errorTextRedeemed: 'Redeemed',
    errorTextFulfilled: 'Fulfilled',
    errorTextGeneric: 'Generic',
  } as const;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.useFakeTimers();
    universalHooksMock.setters.length = 0;
    universalHooksMock.values.length = 0;
    componentBoilerplateMock.useProgramId.mockReturnValue('test-program');
    componentBoilerplateMock.useUserIdentity.mockReturnValue({ jwt: 'test-jwt' });
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { rewards: { data: [{ fuelTankCode: 'CODE123', statuses: [] }] } } },
      loading: false,
    });
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn() },
    });
  });

  it('should return coupon data from the query', () => {
    const result = useCouponCode(props as any);

    expect(result.copyString).toBe('CODE123');
    expect(result.loading).toBe(false);
    expect(result.error).toBe('');
    expect(result.disabled).toBe(false);
  });

  it.each([
    ['EXPIRED', 'Expired'],
    ['CANCELLED', 'Cancelled'],
    ['REDEEMED', 'Redeemed'],
  ])('should return the configured error for %s rewards', (status, message) => {
    componentBoilerplateMock.useQuery.mockReturnValue({
      data: { user: { rewards: { data: [{ fuelTankCode: '', statuses: [status] }] } } },
      loading: false,
    });

    const result = useCouponCode(props as any);

    expect(result.error).toBe(message);
    expect(result.disabled).toBe(true);
  });

  it('should copy the coupon code when clicked', () => {
    const result = useCouponCode(props as any);

    result.onClick();

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('CODE123');
    expect(universalHooksMock.setters[0]).toHaveBeenNthCalledWith(1, true);
    vi.advanceTimersByTime(2000);
    expect(universalHooksMock.setters[0]).toHaveBeenNthCalledWith(2, false);
  });
});
